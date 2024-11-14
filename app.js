import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import passport from "passport";
import swaggerUi from "swagger-ui-express";
import swaggerDocs from "./swaggerOptions.js";
import jwtStrategy from "./auth/jtw-strategy.js";
import { setupDatabase } from "./database.js";
import authRoutes from "./routes/auth.js";
import clinicaRoutes from "./routes/Clinica.js";



export function createApp() {
  const app = express();
  setupDatabase();
  passport.use(jwtStrategy);

  // Middeleware
  app.use(express.json()); // parseo de cuerpo JSON
  app.use(express.urlencoded({ extended: true })); // Body parsing URLEncoded
  app.use(cors())  // CORS html
  app.use(helmet()); // Security con helmet
  app.use(morgan("tiny")); // Logueo
  app.use(passport.initialize()); // Autenticacion

  // Rutas
  app.use("/api/documentos", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
  app.use("/auth", authRoutes);
  app.use("/Clinica", clinicaRoutes);

  app.get("/", (req, res) => {
    res.send("Bienvenido");
  });

  return app;
}
