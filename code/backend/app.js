const express = require("express");
const { mongoose } = require("mongoose");
const cors = require("cors");

const port = 3001;
const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use(require("./routes/deviceRoutes"));
app.use(require("./routes/userRoutes"));
app.use(require("./routes/petRoutes"));

// Start server
app.listen(port, async () => {
  const mongoDB =
    "mongodb+srv://admin:admin123@cluster0.rrsscwc.mongodb.net/petsmart?retryWrites=true&w=majority";
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
