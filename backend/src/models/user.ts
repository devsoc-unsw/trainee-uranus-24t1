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
    public pronouns: string[],
    public age: number,
    public wam: string,
    public academicSocialRatio: number,

    public preferredCourses: string[],
    public preferredLanguages: string[],
    public preferredProgrammingLanguages: string[],
    public preferredPronouns: string[],
    public preferredAgeRange: [number, number],
    public preferredWamRange: [string, string],

    public avatarUrl?: string,

    public _id?: ObjectId,
  ) {}
}
