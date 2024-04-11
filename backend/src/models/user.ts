import { ObjectId } from "mongodb";

export default class User {
  constructor(
    public firstName: string,
    public lastName: string,
    
    public email: string,
    public password: string,

    public courses: string[],
    public futureCourses: string[],
    public hobbies: string[],
    public languages: string[],
    public programmingLanguages: string[],
    public gender: string,
    public age: number,
    public wam: string,
    public academicSocialRatio: number,

    public preferredCourses: string[],
    public preferredLanguages: string[],
    public preferredProgrammingLanguages: string[],
    public preferredGenders: string[],
    public preferredAgeRange: [number, number],
    public preferredWamRange: [string, string],
    public preferredAcademicSocialRatio: number,

    public _id?: ObjectId,
  ) {}
}

export function unpackUser(user: User) {
  const { firstName, lastName, email, password, courses, futureCourses, hobbies, languages, programmingLanguages, gender, age, wam, academicSocialRatio } = user;

  console.log({
    firstName,
    lastName,
    email,
    password,
    courses,
    futureCourses,
    hobbies,
    languages,
    programmingLanguages,
    gender,
    age,
    wam,
    academicSocialRatio
  });
}
