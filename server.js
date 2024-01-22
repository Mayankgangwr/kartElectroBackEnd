const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const imageRoutes = require("./routes/imageRoutes");
const authRoutes = require("./routes/authRoutes")
const cors = require("cors");
const cookieParser = require('cookie-parser');

require('dotenv').config();


const app = express();
app.use(cookieParser());
const PORT = process.env.PORT || 3500;
const LIVE_MONGODB_URI =
  "mongodb+srv://iammayankgangwarbly:prince99@cluster0.rhnec5i.mongodb.net/Agropean?retryWrites=true&w=majority";
  const LOCAL_MONGODB_URI = 'mongodb://localhost:27017/KartElectro';

// mongoose.connect(LOCAL_MONGODB_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
mongoose.connect('mongodb://127.0.0.1:27017/KartElectro', { useNewUrlParser: true, useUnifiedTopology: true });


app.use(cors());

app.use(express.json());


app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use('/auth', require('./routes/authRoutes'))
app.use("/uploads", express.static("uploads"));

// Use the image routes
app.use("/", imageRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
