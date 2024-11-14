import { checkSchema } from "express-validator";

export const mongoIdValidator = {
  in: ["params"],
  isMongoId: {
    errorMessage: "Formato de ID de producto no válido. Debe ser un ObjectId de MongoDB válido",
  },
};

export const mongoIdValidationSchema = checkSchema({
  id: mongoIdValidator,
});

export const paginationValidationSchema = checkSchema({
  page: {
    in: ["query"],
    optional: { options: { nullable: true } },
    isInt: {
      options: { min: 1 },
      errorMessage: "La página debe ser un número entero positivo.",
    },
    toInt: true,
  },
  limit: {
    in: ["query"],
    optional: { options: { nullable: true } },
    isInt: {
      options: { min: 1 },
      errorMessage: "El límite debe ser un número entero positivo.",
    },
    toInt: true,
  },
});
