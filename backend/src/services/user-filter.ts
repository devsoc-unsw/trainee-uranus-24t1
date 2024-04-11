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
    academicSocialRatio
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
    preferredAcademicSocialRatio,
    _id,
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
    preferredAcademicSocialRatio,
    _id,
  }
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
    preferredAcademicSocialRatio,
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
    preferredAcademicSocialRatio,
    _id,
  };
}
