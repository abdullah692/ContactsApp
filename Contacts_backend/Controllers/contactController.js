const express = require("express");
const mongoose = require("mongoose");

const ContactsModal = require("../modals/conatcsModal");

const getAllContacts = async (req, res) => {
  const contacts = await ContactsModal.find();
  res.status(200).json({ message: "Contacts Data", contacts });
};

const getContactById = async (req, res) => {
  try {
    const contactById = await ContactsModal.findById(req.params.id);
    if (contactById) {
      res.status(200).json({ message: "Contact Found", contactById });
    } else {
      res.status(400).json({ message: "Contact Not Found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internel Server Error", error });
  }
};

const postContacts = async (req, res) => {
  try {
    const { name, email, address, phone } = req.body;
    if (!name || !email || !address || !phone) {
      res.send(400).json({ message: "Please provide all data" });
    } else {
      const createContacts = await ContactsModal.create({
        name,
        email,
        address,
        phone,
      });
      if (createContacts) {
        res.status(200).json({ message: "Contact is successfully created" });
      }
    }
  } catch (error) {
    res.status(500).json({ message: "Internel server error", error });
  }
};

const updateContacts = async (req, res) => {
  const checkContacts = await ContactsModal.findById(req.params.id);
  console.log(checkContacts);
  try {
    if (checkContacts) {
      const { name, email, address, phone } = req.body;
      if (!name || !email || !address || !phone) {
        return res.send(400).json({ message: "Please provide all data" });
      } else {
        const updateContactData = await ContactsModal.findByIdAndUpdate(
          req.params.id,
          req.body,
          {
            new: true,
          }
        );
        if (updateContactData) {
          console.log(updateContactData);
          return res
            .status(200)
            .json({ message: "Contact data is updated", updateContactData });
        }
      }
    }
  } catch (error) {
    res.status(500).json({ message: "Internel server error", error });
  }
};

const deleteContacts=async(req,res)=>{
    try {

        const checkContacts = await ContactsModal.findById(req.params.id);
        if(checkContacts)
        {
            const deleteContact=await ContactsModal.deleteOne({_id:req.params.id})
            res.status(200).json({message:'Contact is successfully deleted',deleteContact})
        }
    } catch (error) {
        res.status(500).json({ message: "Internel server error", error });
    }
}

module.exports = {
  getAllContacts,
  postContacts,
  getContactById,
  updateContacts,
  deleteContacts
};
