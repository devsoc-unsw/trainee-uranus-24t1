import User from "../models/user";

/**
 * Function to eliminate sensitive properties of a User,
 * preparaing it to be sent to some other user.
 *
 * @param user The user to process
 * @returns A JavaScript object with the non-sensitive properties
 */
export function publicUserInfo(user: User) {
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

export function privateUserInfo(user: User) {
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
