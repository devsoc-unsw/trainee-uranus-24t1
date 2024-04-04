import validator from "validator";

const staticValidation = {
  email: (email: string) => {
    return validator.isEmail(email);
  },
};

export default staticValidation;