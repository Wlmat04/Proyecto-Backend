import { Router } from "express";
import { validationResult } from "express-validator";
import passport from "passport";
import {
  mongoIdValidationSchema,
  paginationValidationSchema,
} from "../schemas/common.js";
import {
  createClinicaValidationSchema,
  updateClinicaValidationSchema,
} from "../schemas/Clinica.js";
import Clinica from "../models/clinica.js";
import clinica from "../models/clinica.js";

const router = Router();

// CREATE

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  createClinicaValidationSchema,
  async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).send({ errors: result.array() });
    }

    const Clinica = await Clinica.create(req.body);

    return res.json(clinica);
  }
);

// READ

router.get("/", paginationValidationSchema, async (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).send({ errors: result.array() });
  }

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  const startIndex = (page - 1) * limit;

  const Clinica = await Clinica.find().skip(startIndex).limit(limit);
  const totalClinica = await Clinica.countDocuments();

  return res.json({
    page,
    limit,
    totalPages: Math.ceil(totalClinica / limit),
    totalClinica,
    Clinica,
  });
});

router.get("/:id", mongoIdValidationSchema, async (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).send({ errors: result.array() });
  }

  const clinica = await Clinica.findById(req.params.id);

  if (!clinica) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.json(clinica);
});

// UPDATE

router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  updateClinicaValidationSchema,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const updateClinicaValidationSchema = await Clinica.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedClinica) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(updatedClinica);
  }
);

// DELETE

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  mongoIdValidationSchema,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const deletedclinica = await clinica.findByIdAndDelete(req.params.id);

    if (!deletedclinica) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product deleted successfully", deletedClinicat });
  }
);

export default router;
