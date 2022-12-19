const express = require("express");
const { mongoose } = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

const port = 3001;
const app = express();

dotenv.config(); // Load environment variables

app.use(cors());
app.use(express.json());

// Routes
app.use(require("./routes/deviceRoutes"));
app.use(require("./routes/userRoutes"));
app.use(require("./routes/petRoutes"));

// Start server
app.listen(port, async () => {
  const mongoDB = process.env.MONGODB_URI;
  mongoose.set("strictQuery", true);
  await mongoose
    .connect(mongoDB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.log(err);
    });

  console.log(`Server is running on port: ${port}`);
});
