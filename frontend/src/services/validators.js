const isRequired = (fieldName, value) => {
  if (value.trim() === "") throw new Error(`${fieldName} is required`);
};

const validateEmail = (value) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(value)) throw new Error("Invalid email address");
};

const validateGmail = (value) => {
  validateEmail(value); // First, check if it's a valid email
  const domain = value.split("@")[1];
  if (domain !== "gmail.com") throw new Error("Email must be a Gmail account");
};

const validateDate = (value) => {
  if (isNaN(Date.parse(value))) throw new Error("Invalid date");
};

export { isRequired, validateDate, validateEmail, validateGmail };
// const validateAddStudent = (formData) => {
//   isRequired("First Name", formData.firstName);
//   isRequired("Last Name", formData.lastName);
//   isRequired("Email", formData.email);
//   validateEmail(formData.email);
//   isRequired("Event Date", formData.eventDate);
//   validateDate(formData.eventDate);
//   formData.scheduledEmails.forEach((followUp, index) => {
//     error = isDate(followUp.scheduledDate);
//     if (error) throw new Error(`Scheduled Email ${index + 1}: ${error}`);
//   });
// };

// const validateRegistration = (formData) => {
//   isRequired("First Name", formData.firstName);
//   isRequired("Last Name", formData.lastName);
//   isRequired("Email", formData.email);
//   validateEmail(formData.email);
//   isRequired("Event Date", formData.eventDate);
//   validateDate(formData.eventDate);

//   error = isRequired(formData.firstName);
//   if (error) throw new Error(`First Name: ${error}`);
//   error = isRequired(formData.firstName);
//   if (error) throw new Error(`First Name: ${error}`);
//   error = isRequired(formData.firstName);
//   if (error) throw new Error(`First Name: ${error}`);
//   error = isRequired(formData.firstName);
//   if (error) throw new Error(`First Name: ${error}`);

//   errors.firstName = isRequired(formData.firstName);
//   errors.lastName = isRequired(formData.lastName);
//   errors.email = isRequired(formData.email) || isEmail(formData.email);
//   errors.phone = isRequired(formData.phone);

//   const hasErrors = Object.values(errors).some((error) => error !== null);
//   if (hasErrors) {
//     throw new Error(JSON.stringify(errors));
//   }
// };

// export { validateGmail, validateRegistration, validateAddStudent };
