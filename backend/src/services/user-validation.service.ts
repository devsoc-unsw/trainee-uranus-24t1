import validator from "validator";
import User from "../models/user";
import BadRequestError from "../errors/bad-request-error";

const assertValidHelper = {
  course: (input: string) => {
    if (!/^[A-Z]{4}\d{4}$/.test(input)) {
      throw new BadRequestError({
        message: "Course should be 4 uppercase letters followed by 4 numbers",
      });
    }
  },

  wam: (input: string) => {
    if (!/^(HD|DN|CR|PS|FL)$/.test(input)) {
      throw new BadRequestError({
        message: "Wam should be HD, DN, CR, PS, or FL",
      });
    }
  },

  age: (input: number) => {
    if (!Number.isInteger(input) || input < 0) {
      throw new BadRequestError({
        message: "Age should be a non-negative integer",
      });
    }
  },

  academicSocialRatio: (input: number) => {
    if (!input || input < 0 || input > 1) {
      throw new BadRequestError({
        message: "Academic social ratio should range from 0 to 1",
      });
    }
  },

  default: (input: string) => {
    if (!/^[\w ,.'-]{2,}$/.test(input)) {
      throw new BadRequestError({
        message:
          'Should be at least two characters consisting of letters, numbers, and "_ ,.\'-"',
      });
    }
  },
};

export const assertValid = {
  firstName: (input: string) => {
    if (!/^[a-z ,.'-]{2,}$/i.test(input)) {
      throw new BadRequestError({
        message:
          'Name should be at least 2 characters consisting of letters and " ./\'-"',
      });
    }
  },

  lastName: (input: string) => {
    if (!/^[a-z ,.'-]{2,}$/i.test(input)) {
      throw new BadRequestError({
        message:
          'Name should be at least 2 characters consisting of letters and " ./\'-"',
      });
    }
  },

  email: (input: string) => {
    if (!validator.isEmail(input)) {
      throw new BadRequestError({ message: "Invalid email" });
    }
  },

  password: (input: string) => {
    // if (!/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*~=+]).{8,25}$/.test(input)) {
    if (!/^(?=.*[a-zA-Z])(?=.*\d).{8,25}$/.test(input)) {
      throw new BadRequestError({
        message:
          "Password should be 8 to 25 long and have at least one letter, number, and special character",
      });
    }
  },

  courses: (input: string[]) => {
    input.forEach(assertValidHelper.course);
  },

  futureCourses: (input: string[]) => {
    input.forEach(assertValidHelper.course);
  },

  hobbies: (input: string[]) => {
    input.forEach(assertValidHelper.default);
  },

  languages: (input: string[]) => {
    input.forEach(assertValidHelper.default);
  },

  programmingLanguages: (input: string[]) => {
    input.forEach(assertValidHelper.default);
  },

  gender: (input: string) => {
    assertValidHelper.default(input);
  },

  age: (input: number) => {
    assertValidHelper.age(input);
  },

  wam: (input: string) => {
    assertValidHelper.wam(input);
  },

  academicSocialRatio: (input: number) => {
    assertValidHelper.academicSocialRatio(input);
  },

  preferredCourses: (input: string[]) => {
    input.forEach(assertValidHelper.course);
  },

  preferredLanguages: (input: string[]) => {
    input.forEach(assertValidHelper.default);
  },

  preferredProgrammingLanguages: (input: string[]) => {
    input.forEach(assertValidHelper.default);
  },

  preferredGenders: (input: string[]) => {
    input.forEach(assertValidHelper.default);
  },

  preferredAgeRange: (input: [number, number]) => {
    input.forEach(assertValidHelper.age);
  },

  preferredWamRange: (input: [string, string]) => {
    input.forEach(assertValidHelper.wam);
  },

  all: (user: User) => {
    assertValid.firstName(user.firstName);
    assertValid.lastName(user.lastName);

    assertValid.email(user.email);
    assertValid.password(user.password);

    assertValid.courses(user.courses);
    assertValid.futureCourses(user.futureCourses);
    assertValid.hobbies(user.hobbies);
    assertValid.languages(user.languages);
    assertValid.programmingLanguages(user.programmingLanguages);
    assertValid.gender(user.gender);
    assertValid.age(user.age);
    assertValid.wam(user.wam);
    assertValid.academicSocialRatio(user.academicSocialRatio);

    assertValid.preferredCourses(user.preferredCourses);
    assertValid.preferredLanguages(user.preferredLanguages);
    assertValid.preferredProgrammingLanguages(
      user.preferredProgrammingLanguages,
    );
    assertValid.preferredGenders(user.preferredGenders);
    assertValid.preferredAgeRange(user.preferredAgeRange);
    assertValid.preferredWamRange(user.preferredWamRange);
  },

  allPossiblyUndefined: (user: User) => {
    if (user.firstName != undefined) assertValid.firstName(user.firstName);
    if (user.lastName != undefined) assertValid.lastName(user.lastName);

    if (user.email != undefined) assertValid.email(user.email);
    if (user.password != undefined) assertValid.password(user.password);

    if (user.courses != undefined) assertValid.courses(user.courses);
    if (user.futureCourses != undefined)
      assertValid.futureCourses(user.futureCourses);
    if (user.hobbies != undefined) assertValid.hobbies(user.hobbies);
    if (user.languages != undefined) assertValid.languages(user.languages);
    if (user.programmingLanguages != undefined)
      assertValid.programmingLanguages(user.programmingLanguages);
    if (user.gender != undefined) assertValid.gender(user.gender);
    if (user.age != undefined) assertValid.age(user.age);
    if (user.wam != undefined) assertValid.wam(user.wam);
    if (user.academicSocialRatio != undefined)
      assertValid.academicSocialRatio(user.academicSocialRatio);

    if (user.preferredCourses != undefined)
      assertValid.preferredCourses(user.preferredCourses);
    if (user.preferredLanguages != undefined)
      assertValid.preferredLanguages(user.preferredLanguages);
    if (user.preferredProgrammingLanguages != undefined)
      assertValid.preferredProgrammingLanguages(
        user.preferredProgrammingLanguages,
      );
    if (user.preferredGenders != undefined)
      assertValid.preferredGenders(user.preferredGenders);
    if (user.preferredAgeRange != undefined)
      assertValid.preferredAgeRange(user.preferredAgeRange);
    if (user.preferredWamRange != undefined)
      assertValid.preferredWamRange(user.preferredWamRange);
  },
};
