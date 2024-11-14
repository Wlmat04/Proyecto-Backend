import mongoose from "mongoose";

export async function setupDatabase() {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("Conneccion a Base de Datos");
  } catch (err) {
    console.error("Error de Conexion", err);
    process.exit(1);
  }
}
