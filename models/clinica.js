import { Schema, model } from "mongoose";
import Especialidad from "../models/enums/Especialidad.js";
import Paciente from "../models/enums/Paciente.js";
import Jornada from "../models/enums/Jornada.js";


const clinicaSchema = new Schema({
  name_unit: {
    type: String,
    required: true,
    unique: true,
  },
  Especialidad: {
    type: String,
    required: true,
    enum: Object.values(Especialidad),
  },
  Jornada: {
    type: String,
    required: true,
    default: 0,
    enum: Object.values(Jornada),
  },
  Paciente: {
    type: String,
    required: true,
    enum: Object.values(Paciente),
  },
  price: {
    type: Number,
    required: true,
  },
});

export default model("Clinica", productSchema);