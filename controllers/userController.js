const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// User Registration
exports.registerUser = async (req, res) => {
  try {
    //const { name, email, password, role } = req.body;
    const name = "Mayank Gangwar";
    const email= "iammayankgangwarbly@gmail.com";
    const password = "prince@99";
    const role  = "admin";

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role,
    });

    await user.save();

    res.status(201).json({ message: "User registered successfully",
  user: User.find() 
 });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// User Login
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by username
    const user = await User.findOne({ email });

    // Check if the user exists
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Compare the entered password with the hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, "your-secret-key", {
      expiresIn: "7d",
    });

    res.status(200).json({
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
        isAdmin: user.isAdmin,
        image: "user-profile.jpg", // Replace with the actual user image URL
      },
      cart: {
        orderId: "ORD-12345",
        date: "07/09/2023",
        totalqty: 10,
        total: 551,
        tax: 99,
        grandTotal: 650,
        status: "Pending",
        items: [
          {
            product: "fresh",
            quantity: 2,
            price: 130,
            size: "500ml",
            image: "fresh.png", // Replace with the actual product image URL
          },
          {
            product: "balsahali",
            quantity: 1,
            price: 9.99,
            size: "250ml",
            image: "balsahali.png", // Replace with the actual product image URL
          },
        ],
      },
      order: [
        {
          orderId: "ORD-12345",
          date: "07/09/2023",
          totalqty: 10,
          total: 551,
          tax: 99,
          grandTotal: 650,
          status: "Pending",
          items: [
            {
              product: "balsahali",
              quantity: 2,
              price: 65,
              size: "250ml",
              image: "balsahali.png", // Replace with the actual product image URL
            },
            // Add more items with real image URLs
          ],
        },
        {
          orderNumber: "12346",
          total: 59.97,
          date: "2023-09-06",
          items: [
            {
              product: "fresh",
              quantity: 1,
              price: 9.99,
              image: "fresh.png", // Replace with the actual product image URL
            },
            // Add more items with real image URLs
          ],
        },
        // Add more orders with real image URLs
      ],
      token: token,
      status: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
