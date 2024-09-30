// routes/index.js
const express = require("express");
const router = express.Router();
const { User, Address } = require("../models");


// POST /api/register - Register a user with address
router.post("/register", async (req, res) => {
  const { name, street, city, state, zip } = req.body;

  // Validate required fields
  if (!name || !street || !city || !state || !zip) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    // Check if the user already exists
    let user = await User.findOne({ where: { name } });

    if (!user) {
      // Create User if it doesn't exist
      user = await User.create({ name });
    }

    // Create Address associated with the User
    const address = await Address.create({
      street,
      city,
      state,
      zip,
      userId: user.id, // Associate address with the user
    });

    // Respond with success
    return res.status(201).json({
      message: "User and Address created successfully.",
      user: {
        id: user.id,
        name: user.name,
        addresses: [
          {
            id: address.id,
            street: address.street,
            city: address.city,
            state: address.state,
            zip: address.zip,
          },
        ],
      },
    });
  } catch (error) {
    console.error("Error creating user and address:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
});

// // POST /api/register - Register a user with address
// router.post("/register", async (req, res) => {
//   const { name, street, city, state, zip } = req.body;

//   if (!name || !street || !city || !state || !zip) {
//     return res.status(400).json({ message: "All fields are required." });
//   }

//   try {
//     // Create User
//     const user = await User.create({ name });

//     // Create Address associated with the User
//     const address = await Address.create({
//       street,
//       city,
//       state,
//       zip,
//       userId: user.id,
//     });

//     return res.status(201).json({
//       message: "User and Address created successfully.",
//       user: {
//         id: user.id,
//         name: user.name,
//         addresses: [
//           {
//             id: address.id,
//             street: address.street,
//             city: address.city,
//             state: address.state,
//             zip: address.zip,
//           },
//         ],
//       },
//     });
//   } catch (error) {
//     console.error("Error creating user and address:", error);
//     return res.status(500).json({ message: "Internal server error." });
//   }
// });

// GET /api/users - Get all users with their addresses
router.get("/users", async (req, res) => {
  try {
    const users = await User.findAll({
      include: [{ model: Address, as: "addresses" }],
    });
    return res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
});

module.exports = router;
