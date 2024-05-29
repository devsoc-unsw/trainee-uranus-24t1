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
  const result = await collections.users
    ?.find({ $nor: [{ _id: req.user._id }] })
    .toArray();
  return res.status(200).json(result?.map(filterPublic));
});
