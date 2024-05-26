import User from "../models/user";

// These functions go out of their way to remove any extra fields
// to prevent adding unexpected stuff to the database

export function filterPublic(user: unknown) {
  const {
    firstName,
    lastName,
    courses,
    futureCourses,
    hobbies,
    languages,
    programmingLanguages,
    gender,
    age,
    wam,
    academicSocialRatio,
    avatarUrl,
    _id,
  } = user as User;

  return {
    firstName,
    lastName,
    courses,
    futureCourses,
    hobbies,
    languages,
    programmingLanguages,
    gender,
    age,
    wam,
    academicSocialRatio,
    avatarUrl,
    _id,
  };
}

export function filterPrivate(user: unknown) {
  const {
    email,
    password,
    preferredCourses,
    preferredLanguages,
    preferredProgrammingLanguages,
    preferredGenders,
    preferredAgeRange,
    preferredWamRange,
  } = user as User;

  return {
    email,
    password,
    preferredCourses,
    preferredLanguages,
    preferredProgrammingLanguages,
    preferredGenders,
    preferredAgeRange,
    preferredWamRange,
  };
}

export function filterAll(user: unknown) {
  const {
    firstName,
    lastName,
    courses,
    futureCourses,
    hobbies,
    languages,
    programmingLanguages,
    gender,
    age,
    wam,
    academicSocialRatio,
    email,
    password,
    preferredCourses,
    preferredLanguages,
    preferredProgrammingLanguages,
    preferredGenders,
    preferredAgeRange,
    preferredWamRange,
    avatarUrl,
    _id,
  } = user as User;

  return {
    firstName,
    lastName,
    courses,
    futureCourses,
    hobbies,
    languages,
    programmingLanguages,
    gender,
    age,
    wam,
    academicSocialRatio,
    email,
    password,
    preferredCourses,
    preferredLanguages,
    preferredProgrammingLanguages,
    preferredGenders,
    preferredAgeRange,
    preferredWamRange,
    avatarUrl,
    _id,
  };
}

export function filterNullish<T>(obj: { [key: string]: any }) {
  return Object.keys(obj)
    .filter((key) => obj[key] != null)
    .reduce(
      (acc, key) => {
        acc[key] = obj[key];
        return acc;
      },
      {} as { [key: string]: any },
    ) as T;
}
