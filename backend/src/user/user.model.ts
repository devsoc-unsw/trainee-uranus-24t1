interface User {
  name: string;
  email: string;
  password: string;

  _id: number;
}

interface UserExtended {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  image: never;

  courses: string[];
  futureCourses: string[];
  hobbies: string[];
  programmingLanguages: string[];
  languages: string[];
  gender: string;
  age: number;
  wam: string;
  academicSocialRatio: number;

  preferredLanguages: string[];
  preferredGender: string[];
  preferredAgeRange: [number, number];
  preferredWamRange: [string, string];
  preferredAcademicSocialRatio: number;
}

const users: User[] = [];

let ids = 0;
const nextId = () => (ids += 1);

const save = (user: { name: string, email: string, password: string}) => {
  const { name, email, password } = user;
  const newUser = { name, email, password, _id: nextId() };
  users.push(newUser);
  return newUser;
}

const findOne = (email: string) => {
  return users.find(user => user.email === email);
}

export default {
  save,
  findOne,
};