import validator from "validator";

const assertValidHelper = {
  course: (input: string) => {
    if (!/^[A-Z]{4}\d{4}$/.test(input)) {
      throw new Error('Course should be 4 uppercase letters followed by 4 numbers');
    }
  },

  wam: (input: string) => {
    if (!/^(HD|DN|CR|PS|FL)$/.test(input)) {
      throw new Error('Wam should be HD, DN, CR, PS, or FL');
    }
  },

  age: (input: number) => {
    if (!Number.isInteger(input) || input < 0) {
      throw new Error('Age should be a non-negative integer');
    }
  },
  
  academicSocialRatio: (input: number) => {
    if (input < 0 || input > 1) {
      throw new Error('Academic social ratio should range from 0 to 1');
    }
  },

  default: (input: string) => {
    if (!/^[\w ,.'-]{2,}$/.test(input)) {
      throw new Error('Should be at least two characters consisting of letters, numbers, and "_ ,.\'-"');
    }
  }
};

const assertValid = {
  firstName: (input: string) => {
    if (!/^[a-z ,.'-]{2,}$/i.test(input)) {
      throw new Error('Name should be at least 2 characters consisting of letters and " ./\'-"');
    }
  },

  lastName: (input: string) => {
    if (!/^[a-z ,.'-]{2,}$/i.test(input)) {
      throw new Error('Name should be at least 2 characters consisting of letters and " ./\'-"');
    }
  },

  email: (input: string) => {
    if (!validator.isEmail(input)) {
      throw new Error('Invalid email');
    }
  },

  password: (input: string) => {
    if (!/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*~=+]).{8,25}$/.test(input)) {
      throw new Error('Password should be 8 to 25 long and have at least one letter, number, and special character');
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

  preferredAcademicSocialRatio: (input: number) => {
    assertValidHelper.academicSocialRatio(input);
  },
};

export default assertValid;
