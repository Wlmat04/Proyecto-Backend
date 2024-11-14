import { checkSchema } from "express-validator";
import User from "../models/User.js";

//Ingreso
export const loginValidationSchema = checkSchema({
  email: {
    in: ["body"],
    isEmail: {
      errorMessage: "Por favor proporcione una direccion de correo electronico valido",
    },
    normalizeEmail: true,
    exists: {
      errorMessage: "El correo es requerido",
    },
  },
  password: {
    in: ["body"],
    isLength: {
      options: { min: 10 },
      errorMessage: "La contraseña debe tener al menos 10 caracteres",
    },
    exists: {
      errorMessage: "Se requiere contraseña",
    },
  },
});

//Suscripcion
export const signupValidationSchema = checkSchema({
  email: {
    in: ["body"],
    isEmail: {
      errorMessage: "Por Favor proporcione una direccion de correo electronico valido",
    },
    normalizeEmail: true,
    custom: {
      options: async (email) => {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          throw new Error("El correo electronico ya esta en uso.");
        }
      },
      bail: true,
    },
    exists: {
      errorMessage: "Se requiere correo electronico",
    },
  },
  password: {
    in: ["body"],
    isLength: {
      options: { min: 6 },
      errorMessage: "La contraseña debe tener al menos 6 caracteres",
    },
    exists: {
      errorMessage: "Se requiere contraseña",
    },
  },
  name: {
    in: ["body"],
    isLength: {
      options: { min: 2 },
      errorMessage: "El nombre debe tener al menos 2 caracteres",
    },
    trim: true,
    escape: true,
    exists: {
      errorMessage: "El nombre es obligatorio",
    },
  },
});
