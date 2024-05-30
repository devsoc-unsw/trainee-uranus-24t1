import express, { Request, Response } from "express";
import { collections } from "../services/database.service";
import User from "../models/user";
import { requireToken } from "../middleware/token.middleware";
import { assertValid } from "../services/user-validation.service";
import {
  filterAll,
  filterNullish,
  filterPublic,
} from "../services/user-filter";
import bcrypt from "bcrypt";
import multer from "multer";
import "express-async-errors"; // Apply async error patch
import BadRequestError from "../errors/bad-request-error";
import { promises } from "fs";
import { uploadAvatar } from "../services/avatar.service";
import { unlink } from "fs/promises";

export const selfRouter = express.Router();
selfRouter.use(express.json());
selfRouter.use(requireToken);

const upload = multer({ dest: "uploads/" });

selfRouter.get("/", async (req: Request, res: Response) => {
  res.status(200).json(req.user);
});

selfRouter.put("/", async (req: Request, res: Response) => {
  let updatedUser: User = filterAll(req.body) as User;
  assertValid.allPossiblyUndefined(updatedUser);
  updatedUser = filterNullish(updatedUser);

  if (updatedUser.password) {
    const hash = await bcrypt.hash(updatedUser.password, 5);
    updatedUser.password = hash;
  }

  const { _id, ...withoutId } = updatedUser; // Do not update _id
  const result = await collections.users?.updateOne(
    { _id: req.user._id },
    { $set: withoutId },
  );
  if (!result) {
    return res.status(304).send("Could not update user");
  }

  res.status(200).send("Successfully updated user");
});

selfRouter.post(
  "/avatar",
  upload.single("image"),
  async (req: Request, res: Response) => {
    const file = req.file;
    if (!file) {
      throw new BadRequestError({ message: "No file uploaded." });
    }

    if (!/jpeg|jpg|png|gif|bmp|webp|svg/.test(file.mimetype)) {
      await unlink(file.path);
      throw new BadRequestError({ message: "Please upload an image file" });
    }

    const fileContent = await promises.readFile(file.path);
    const fileExtension = file.originalname.split(".").pop();
    const fileName = `avatars/${req.user._id}.${fileExtension}`;

    const url = await uploadAvatar(fileName, fileContent);

    const result = await collections.users?.updateOne(
      { _id: req.user._id },
      { $set: { avatarUrl: url } },
    );
    if (!result) {
      return res.status(304).send("Could not update user");
    }

    await unlink(file.path);
    return res.status(200).json(url);
  },
);

selfRouter.get("/messages", async (req: Request, res: Response) => {
  const result = await collections.messages
    ?.find({ members: req.user._id })
    .toArray();
  return res.status(200).json(result);
});

selfRouter.get("/matches", async (req: Request, res: Response) => {
  const wams = ["FL", "PS", "CR", "DN", "HD"];
  const similarity = <T>(arr: T[], set: Set<T>) => {
    if (arr == undefined || set == undefined) {
      return 0;
    }
    return arr.filter((value) => set.has(value)).length;
  };
  const wamInRange = (
    wam: string | undefined,
    wamRange: [string, string] | undefined,
  ) => {
    if (wam == undefined || wamRange == undefined) {
      return 0;
    }

    return (
      wams.indexOf(wamRange[0]) <= wams.indexOf(wam) &&
      wams.indexOf(wam) <= wams.indexOf(wamRange[1])
    );
  };
  const ageInRange = (
    age: number | undefined,
    ageRange: [number, number] | undefined,
  ) => {
    if (age == undefined || ageRange == undefined) {
      return 0;
    }

    return ageRange[0] <= age && age <= ageRange[1];
  };
  const standardized = (arr: number[]) => {
    // We could use either sum or max to standardize
    // I don't know which is better
    // const sum = arr.reduce((a, i) => a + i, 0);
    const max = Math.max(...arr);
    if (max === 0) {
      return arr;
    }
    return arr.map((n) => n / max);
  };
  const sum = (vector: number[]) => vector.reduce((a, x) => a + x, 0);
  const vectorNorm = (vector: number[]) =>
    Math.sqrt(sum(vector.map((x) => Math.pow(x, 2))));

  const self = req.user;
  const users = (await collections.users
    ?.find({ $nor: [{ _id: req.user._id }] })
    .toArray()) as unknown as User[];
  const sets = users.map((user) => ({
    courses: new Set(user.courses),
    futureCourses: new Set(user.futureCourses),
    hobbies: new Set(user.hobbies),
    languages: new Set(user.languages),
    pronouns: new Set(user.pronouns),
    programmingLanguages: new Set(user.programmingLanguages),
    preferredCourses: new Set(user.preferredCourses),
    preferredLanguages: new Set(user.preferredLanguages),
    preferredPronouns: new Set(user.preferredPronouns),
  }));

  const vectors = [
    sets.map((user) => similarity(self.preferredCourses, user.futureCourses)),
    sets.map((user) => similarity(self.futureCourses, user.preferredCourses)),
    sets.map((user) => similarity(self.hobbies, user.hobbies)),
    sets.map((user) => similarity(self.languages, user.languages)),
    sets.map((user) => similarity(self.preferredLanguages, user.languages)),
    sets.map((user) => similarity(self.languages, user.preferredLanguages)),
    sets.map((user) => similarity(self.pronouns, user.preferredPronouns)),
    sets.map((user) => similarity(self.preferredPronouns, user.pronouns)),
    users.map((user) => (wamInRange(self.wam, user.preferredWamRange) ? 1 : 0)),
    users.map((user) => (wamInRange(user.wam, self.preferredWamRange) ? 1 : 0)),
    users.map((user) => (ageInRange(self.age, user.preferredAgeRange) ? 1 : 0)),
    users.map((user) => (ageInRange(user.age, self.preferredAgeRange) ? 1 : 0)),
  ].map(standardized);
  const secondaryVectors = [
    sets.map((user) =>
      similarity(self.programmingLanguages, user.programmingLanguages),
    ),
    sets.map((user) => similarity(self.courses, user.courses)),
    sets.map((user) => similarity(self.futureCourses, user.futureCourses)),
  ].map(standardized);

  const rank = Array.from(users.keys()).map((i) =>
    vectorNorm(vectors.map((v) => v[i])),
  );
  const secondaryRank = Array.from(users.keys()).map((i) =>
    vectorNorm(vectors.map((v) => v[i])),
  );

  const order = Array.from(users.keys()).sort((i, j) => {
    if (rank[i] !== rank[j]) {
      return rank[j] - rank[i];
    }
    return secondaryRank[j] - secondaryRank[i];
  });

  const orderedUsers = order.map((i) => users[i]);

  return res.status(200).json(orderedUsers?.map(filterPublic));
});
