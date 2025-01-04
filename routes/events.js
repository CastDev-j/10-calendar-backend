const { check } = require("express-validator");
const { createEvent, getEvents, updateEvent, deleteEvent } = require("../controllers/events");
const { validateJWT } = require("../middlewares/validate-jwt");
const { Router } = require("express");
const { validateField } = require("../middlewares/field-validators");
const { isDate } = require("../helpers");
const router = Router();

// Public routes

// none

router.use(validateJWT);

// Private routes

router.get("/", getEvents);

router.post("/",[
    check("title", "El título es obligatorio").not().isEmpty(),
    check("start", "Fecha de inicio es obligatoria").custom(isDate),
    check("end", "Fecha de finalización es obligatoria").custom(isDate),
    validateField
], createEvent);

router.put("/:id",[
    check("title", "El título es obligatorio").not().isEmpty(),
    check("start", "Fecha de inicio es obligatoria").custom(isDate),
    check("end", "Fecha de finalización es obligatoria").custom(isDate),
    validateField
], updateEvent);

router.delete("/:id", deleteEvent);

module.exports = router;
