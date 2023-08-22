const express = require("express");
const router=express.Router();
const {
  getAllContacts,
  postContacts,
  getContactById,
  updateContacts,
  deleteContacts,
} = require("../Controllers/contactController");
const validateToken=require('../middleware/validateToken')


router.use(validateToken)
router.route('/').get(getAllContacts).post(postContacts);
router.route('/:id').get(getContactById).put(updateContacts).delete(deleteContacts)

module.exports=router;

