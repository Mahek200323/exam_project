const express = require("express");
const router = express.Router();
const {
  getContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact,
} = require("../controllers/contactController");

// CRUD Routes
router.get("/", getContacts);        // Read all
router.get("/:id", getContact);      // Read one
router.post("/", createContact);     // Create
router.put("/:id", updateContact);   // Update
router.delete("/:id", deleteContact); // Delete

module.exports = router;
