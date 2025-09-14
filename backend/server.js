const express = require("express");
const dotenv = require("dotenv");
const connectDb = require("./config/db");
const contactRoutes = require("./routes/contactRoutes");
const cookieRoutes = require("./routes/cookieRoutes");
const Contact = require("./models/contactModel");

const cookieParser = require("cookie-parser");

dotenv.config();
connectDb();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // ✅ only once

// Set view engine
app.set("view engine", "ejs");

// Home page  
app.get("/", async (req, res) => {
  const contacts = await Contact.find();
  // const lastAddedContact = req.cookies.lastAddedContact || null;
  res.render("index", { contacts });
});

// Add contact
app.post("/add", async (req, res) => {
  const { name, email, phone } = req.body;
  const contact = await Contact.create({ name, email, phone });

  // Set cookie dynamically
  res.cookie("lastAddedContact", contact.name, {
    maxAge: 5 * 60 * 1000,
    httpOnly: true
  });

  res.redirect("/");
});

// Show edit form
app.get("/edit/:id", async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  // const lastAddedContact = req.cookies.lastAddedContact || null; // ✅ pass cookie
  res.render("edit", { contact });
});

// Handle update
app.post("/update/:id", async (req, res) => {
  const { name, email, phone } = req.body;
  await Contact.findByIdAndUpdate(req.params.id, { name, email, phone });

  // Update cookie if you want
  res.cookie("lastAddedContact", name, { maxAge: 5 * 60 * 1000, httpOnly: true });

  res.redirect("/");
});

// Delete contact
app.get("/delete/:id", async (req, res) => {
  await Contact.findByIdAndDelete(req.params.id);
  res.redirect("/"); // home route reads cookie
});

// API Routes
app.use("/api/contacts", contactRoutes);

// Cookie Routes
app.use("/cookies", cookieRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
