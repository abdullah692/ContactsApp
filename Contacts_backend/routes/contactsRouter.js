const express = require("express");
const router=express.Router();
const {
  getAllContacts,
  postContacts,
  getContactById,
  updateContacts,
  deleteContacts,
} = require("../Controllers/contactController");

router.route('/').get(getAllContacts).post(postContacts);
router.route('/:id').get(getContactById).put(updateContacts).delete(deleteContacts)

module.exports=router;

