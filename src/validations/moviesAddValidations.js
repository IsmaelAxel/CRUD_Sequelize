const { check } = require("express-validator");

module.exports = [
  check("title")
    .notEmpty()
    .withMessage("Es obligatorio")
    .matches(/^[a-zA-Z\s]+$/).withMessage('El campo solo debe contener letras')
    .isLength({
      min: 4,
      max: 20,
    })
    .withMessage("Debe tener entre 4 y 20 caracteres"),
  check("rating")
    .notEmpty()
    .withMessage("Es obligatorio")
    .isDecimal().withMessage('El campo debe ser un número decimal válido "con ."')
    .isFloat({ gt: 0 }).withMessage('El campo debe ser un número decimal positivo'),
  check("awards")
    .notEmpty()
    .withMessage("Es obligatorio")
    .isInt({
      gt: 1,
    })
    .withMessage("Debe ser un numero positivo"),
    check("release_date")
    .notEmpty()
    .withMessage("Es obligatorio"),
    check("length")
    .notEmpty()
    .withMessage("Es obligatorio")
    .isInt({
      gt:1
    }).withMessage("Debe ser un numero positivo"),
];