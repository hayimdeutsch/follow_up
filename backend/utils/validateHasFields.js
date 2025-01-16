import CustomError from "./CustomError.js";

export default function validateHasFields(body, requiredFieldsArray) {
  const missingFields = requiredFieldsArray.filter(
    (field) => !body.hasOwnProperty(field)
  );

  if (missingFields.length > 0) {
    throw new CustomError(
      `Missing required fields: [${missingFields.join(", ")}]`,
      400
    );
  }
}
