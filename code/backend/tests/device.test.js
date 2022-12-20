const express = require("express");
const mongoose = require("mongoose");
const request = require("supertest");
const app = express();

require("dotenv").config();

app.use(express.json());

// Routes
app.use(require("../routes/deviceRoutes"));

/* Connecting to the database before each test. */
beforeEach(async () => {
  await mongoose.connect(process.env.MONGODB_URI);
});

/* Closing database connection after each test. */
afterEach(async () => {
  await mongoose.connection.close();
});

describe("GET /devices", () => {
  it("should return all devices", async () => {
    const res = await request(app).get("/devices");
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it("should return a device with an id and pin", async () => {
    const res = await request(app).get("/devices");
    expect(res.statusCode).toBe(200);
    expect(res.body[0]).toHaveProperty("_id");
    expect(res.body[0]).toHaveProperty("pin");
  });
});
