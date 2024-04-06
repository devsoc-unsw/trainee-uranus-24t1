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
    ...sanitised
  } = user;

  return sanitised;
}
