import { checkSchema } from "express-validator";
import Clinica from "../models/clinica.js";
import Especialidad from "../models/enums/Especialidad.js";
import Paciente from "../models/enums/Paciente.js";
import Jornada from "../models/enums/Jornada.js";
import { mongoIdValidator } from "./common.js";

export const createClinicaValidationSchema = checkSchema({
  name_unit: {
    trim: true,
    escape: true,
    custom: {
      options: async (name) => {
        const nameExist = await Clinica.findOne({
          name_unit: { $regex: new RegExp(`^${name}$`, "i") },
        });
        if (nameExist) {
          throw new Error("Nombre en uso");
        }
      },
      bail: true,
    },
    isLength: {
      options: { min: 2 },
      errorMessage: "Nombre debe tener al menos 2 caracteres",
    },
    in: ["body"],
    exists: { errorMessage: "Nombre del producto requerido." },
  },

  especialidad: {
    exists: { errorMessage: "El tipo de especialidad es requerido." },
    isIn: {
      options: [Object.values(Especialidad)],
      errorMessage: `Especialidad inválida, las opciones son: ${Object.values(Especialidad)
        .map((v) => `'${v}'`)
        .join(", ")}`,
    },
    trim: true,
    in: ["body"],
    bail: true,
  },

  paciente: {
    exists: { errorMessage: "El tipo de paciente es requerido." },
    isIn: {
      options: [Object.values(Paciente)],
      errorMessage: `Paciente inválido, las opciones son: ${Object.values(Paciente)
        .map((v) => `'${v}'`)
        .join(", ")}`,
    },
    trim: true,
    in: ["body"],
    bail: true,
  },

  jornada: {
    exists: { errorMessage: "El tipo de jornada es requerido." },
    isIn: {
      options: [Object.values(Jornada)],
      errorMessage: `Jornada inválida, las opciones son: ${Object.values(Jornada)
        .map((v) => `'${v}'`)
        .join(", ")}`,
    },
    trim: true,
    in: ["body"],
    bail: true,
  },

  price: {
    exists: { errorMessage: "El precio es requerido." },
    isFloat: {
      options: { min: 0.0 },
      errorMessage: "El precio debe ser un número positivo.",
    },
    in: ["body"],
    bail: true,
  },
});

//
export const updateClinicaValidationSchema = checkSchema({
  id: mongoIdValidator,
  name: {
    optional: true,
    trim: true,
    escape: true,
    custom: {
      options: async (name, { req }) => {
        const nameExists = await Clinica.findOne({
          _id: { $ne: req.params.id },
          name: { $regex: new RegExp(`^${name}$`, "i") },
        });

        if (nameExist) {
          throw new Error("Nombre en uso.");
        }
      },
      bail: true,
    },
    isLength: {
      options: { min: 2 },
      errorMessage: "Nombre debe tener al menos 2 caracteres.",
    },
    in: ["body"],
  },


  especialidad: {
    optional: true,
    isIn: {
      options: [Object.values(Especialidad)],
      errorMessage: `especialidad is invalid. Options are ${Object.values(Especialidad)
        .map((v) => `'${v}'`)
        .join(", ")}`,
    },
    trim: true,
    in: ["body"],
  },


  paciente: {
    optional: true,
    isIn: {
      options: [Object.values(Paciente)],
      errorMessage: `paciente is invalid. Options are ${Object.values(Paciente)
        .map((v) => `'${v}'`)
        .join(", ")}`,
    },
    trim: true,
    in: ["body"],
  },


  jornada: {
    optional: true,
    isIn: {
      options: [Object.values(Jornada)],
      errorMessage: `jornada is invalid. Options are ${Object.values(Jornada)
        .map((v) => `'${v}'`)
        .join(", ")}`,
    },
    trim: true,
    in: ["body"],
  },

  price: {
    optional: true,
    isFloat: {
      options: { min: 0.0 },
      errorMessage: "El precio debe ser un numero positivo.",
    },
    in: ["body"],
  },

});
