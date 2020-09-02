const { Router } = require('express');
const router = Router();

//const { json } = require("express");

const { getPasses, createPass, editPass, deletePass, getPass} = require ('../controllers/functions.controller');

router
  .route('/')
  .get(getPasses)
  .post(createPass);

router
  .route('/:id')
  .get(getPass)
  .put(editPass)
  .delete(deletePass);

module.exports = router;