import User from "../models/user";

// These functions go out of their way to remove any extra fields
// to prevent adding extra fields to the database

export function filterPublic(user: User) {
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
  } = user;

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

export function filterPrivate(user: User) {
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
  } = user;

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

export function filterAll(user: User) {
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
  } = user;

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
