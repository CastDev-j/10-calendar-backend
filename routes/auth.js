const { check } = require("express-validator");
const { loginUser, createUser, revalidateToken } = require("../controllers/auth");
const { validateField } = require("../middlewares/field-validators");
const { validateJWT } = require("../middlewares/validate-jwt");
const { Router } = require("express");
const router = Router();

router.post("/", [
    check("email", "El email es obligatorio").isEmail(),
    check("password", "El password debe de ser de 6 caracteres").isLength({ min: 6 }),
    validateField
], loginUser);

router.post("/new", [
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").isEmail(),
    check("password", "El password debe de ser de 6 caracteres").isLength({ min: 6 }),
    validateField
], createUser);

router.get("/renew", validateJWT, revalidateToken);



module.exports = router;