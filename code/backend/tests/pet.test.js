const express = require("express");
const mongoose = require("mongoose");
const request = require("supertest");
const { generateAccessToken } = require("../auth/jwt");
const app = express();

require("dotenv").config();

app.use(express.json());

// Routes
app.use(require("../routes/petRoutes"));

const token = generateAccessToken({ user_id: "639b66fa02e35eb25ff4c774" });
const err_token = generateAccessToken({ user_id: "739b66fa02e35eb25ff4c774" });
let vaccinationId;

/* Connecting to the database before each test. */
beforeEach(async () => {
  await mongoose.connect(process.env.MONGODB_URI);
});

/* Closing database connection after each test. */
afterEach(async () => {
  await mongoose.connection.close();
});

// get overview
describe("GET /pet/overview", () => {
  it("should return 401 if user is not logged in", async () => {
    const res = await request(app).get("/pet/overview");
    expect(res.statusCode).toBe(401);
    expect(res.text).toBe("Unauthorized");
  });

  it("should return 400 if user doesn't exist", async () => {
    const res = await request(app)
      .get("/pet/overview")
      .set("Authorization", "Bearer " + err_token);
    expect(res.statusCode).toBe(400);
    expect(res.text).toBe("Error fetching user!");
  });

  it("should return 200 if success", async () => {
    const res = await request(app)
      .get("/pet/overview")
      .set("Authorization", "Bearer " + token);
    expect(res.statusCode).toBe(200);
  });

  it("should return an object with pet's overview", async () => {
    const res = await request(app)
      .get("/pet/overview")
      .set("Authorization", "Bearer " + token);
    expect(res.body).toHaveProperty("location");
    expect(res.body).toHaveProperty("vital");
    expect(res.body).toHaveProperty("sleep");
  });
});

// get vaccinations
describe("GET /pet/vaccinations", () => {
  it("should return 401 if user is not logged in", async () => {
    const res = await request(app).get("/pet/vaccinations");
    expect(res.statusCode).toBe(401);
    expect(res.text).toBe("Unauthorized");
  });

  it("should return 400 if user doesn't exist", async () => {
    const res = await request(app)
      .get("/pet/vaccinations")
      .set("Authorization", "Bearer " + err_token);
    expect(res.statusCode).toBe(400);
    expect(res.text).toBe("Error fetching user!");
  });

  it("should return 200 if success", async () => {
    const res = await request(app)
      .get("/pet/vaccinations")
      .set("Authorization", "Bearer " + token);
    expect(res.statusCode).toBe(200);
  });

  it("should return an array of pet's vaccinations", async () => {
    const res = await request(app)
      .get("/pet/vaccinations")
      .set("Authorization", "Bearer " + token);
    expect(res.body).toBeInstanceOf(Array);
  });

  it("should return an array of objects", async () => {
    const res = await request(app)
      .get("/pet/vaccinations")
      .set("Authorization", "Bearer " + token);
    expect(res.body[0]).toBeInstanceOf(Object);
  });

  it("should return an array of objects with vaccination's properties", async () => {
    const res = await request(app)
      .get("/pet/vaccinations")
      .set("Authorization", "Bearer " + token);
    expect(res.body[0]).toHaveProperty("scheduledDate");
    expect(res.body[0]).toHaveProperty("name");
  });
});

// get vitals
describe("GET /pet/vitals", () => {
  it("should return 401 if user is not logged in", async () => {
    const res = await request(app).get("/pet/vitals");
    expect(res.statusCode).toBe(401);
    expect(res.text).toBe("Unauthorized");
  });

  it("should return 400 if user doesn't exist", async () => {
    const res = await request(app)
      .get("/pet/vitals")
      .set("Authorization", "Bearer " + err_token);
    expect(res.statusCode).toBe(400);
    expect(res.text).toBe("Error fetching user!");
  });

  it("should return 200 if success", async () => {
    const res = await request(app)
      .get("/pet/vitals")
      .set("Authorization", "Bearer " + token);
    expect(res.statusCode).toBe(200);
  });

  it("should return an array of pet's vitals", async () => {
    const res = await request(app)
      .get("/pet/vitals")
      .set("Authorization", "Bearer " + token);
    expect(res.body).toBeInstanceOf(Array);
  });

  it("should return an array of objects", async () => {
    const res = await request(app)
      .get("/pet/vitals")
      .set("Authorization", "Bearer " + token);
    expect(res.body[0]).toBeInstanceOf(Object);
  });

  it("should return an array of objects with vital's properties", async () => {
    const res = await request(app)
      .get("/pet/vitals")
      .set("Authorization", "Bearer " + token);
    expect(res.body[0]).toHaveProperty("dateTime");
    expect(res.body[0]).toHaveProperty("temperature");
    expect(res.body[0]).toHaveProperty("heartRate");
  });
});

// get sleep data
describe("GET /pet/sleeps", () => {
  it("should return 401 if user is not logged in", async () => {
    const res = await request(app).get("/pet/sleeps");
    expect(res.statusCode).toBe(401);
    expect(res.text).toBe("Unauthorized");
  });

  it("should return 400 if user doesn't exist", async () => {
    const res = await request(app)
      .get("/pet/sleeps")
      .set("Authorization", "Bearer " + err_token);
    expect(res.statusCode).toBe(400);
    expect(res.text).toBe("Error fetching user!");
  });

  it("should return 200 if success", async () => {
    const res = await request(app)
      .get("/pet/sleeps")
      .set("Authorization", "Bearer " + token);
    expect(res.statusCode).toBe(200);
  });

  it("should return an array of pet's sleeps", async () => {
    const res = await request(app)
      .get("/pet/sleeps")
      .set("Authorization", "Bearer " + token);
    expect(res.body).toBeInstanceOf(Array);
  });

  it("should return an array of objects with sleep's properties", async () => {
    const res = await request(app)
      .get("/pet/sleeps")
      .set("Authorization", "Bearer " + token);
    expect(res.body[0]).toHaveProperty("startTime");
    expect(res.body[0]).toHaveProperty("duration");
  });
});

// get locations
describe("GET /pet/locations", () => {
  it("should return 401 if user is not logged in", async () => {
    const res = await request(app).get("/pet/locations");
    expect(res.statusCode).toBe(401);
    expect(res.text).toBe("Unauthorized");
  });

  it("should return 400 if user doesn't exist", async () => {
    const res = await request(app)
      .get("/pet/locations")
      .set("Authorization", "Bearer " + err_token);
    expect(res.statusCode).toBe(400);
    expect(res.text).toBe("Error fetching user!");
  });

  it("should return 200 if success", async () => {
    const res = await request(app)
      .get("/pet/locations")
      .set("Authorization", "Bearer " + token);
    expect(res.statusCode).toBe(200);
  });

  it("should return an array of pet's locations", async () => {
    const res = await request(app)
      .get("/pet/locations")
      .set("Authorization", "Bearer " + token);
    expect(res.body).toBeInstanceOf(Array);
  });

  it("should return an array of objects with location's properties", async () => {
    const res = await request(app)
      .get("/pet/locations")
      .set("Authorization", "Bearer " + token);
    expect(res.body[0]).toHaveProperty("dateTime");
    expect(res.body[0]).toHaveProperty("latitude");
    expect(res.body[0]).toHaveProperty("longitude");
  });
});

// create pet vaccination
describe("POST /pet/vaccinations", () => {
  it("should return 401 if user is not logged in", async () => {
    const res = await request(app).post("/pet/vaccinations");
    expect(res.statusCode).toBe(401);
    expect(res.text).toBe("Unauthorized");
  });

  it("should return 201 if success", async () => {
    const res = await request(app)
      .post("/pet/vaccinations")
      .set("Authorization", "Bearer " + token)
      .send({
        name: "rabies",
        scheduledDate: new Date(),
      });
    expect(res.statusCode).toBe(200);
  });

  it("should return the created vaccination if success", async () => {
    const res = await request(app)
      .post("/pet/vaccinations")
      .set("Authorization", "Bearer " + token)
      .send({
        name: "rabies",
        scheduledDate: new Date(),
      });
    expect(res.body).toHaveProperty("name");
    expect(res.body).toHaveProperty("scheduledDate");
    vaccinationId = res.body._id;
  });
});

// edit vaccination
describe(`PUT /pet/vaccinations/:id`, () => {
  beforeEach(async () => {
    const res = await request(app)
      .post("/pet/vaccinations")
      .set("Authorization", "Bearer " + token)
      .send({
        name: "rabies",
        scheduledDate: new Date(),
      });
    vaccinationId = res.body._id;
  });

  it("should return 401 if user is not logged in", async () => {
    const res = await request(app).put(`/pet/vaccinations/${vaccinationId}`);
    expect(res.statusCode).toBe(401);
    expect(res.text).toBe("Unauthorized");
  });

  it("should return 200 if success", async () => {
    const res = await request(app)
      .put(`/pet/vaccinations/${vaccinationId}`)
      .set("Authorization", "Bearer " + token)
      .send({
        name: "rabies2",
        completedDate: new Date(),
      });
    expect(res.statusCode).toBe(200);
  });

  it("should return the updated vaccination if success", async () => {
    const res = await request(app)
      .put(`/pet/vaccinations/${vaccinationId}`)
      .set("Authorization", "Bearer " + token)
      .send({
        name: "rabies2",
        completedDate: new Date(),
      });
    expect(res.body).toHaveProperty("name");
    expect(res.body).toHaveProperty("completedDate");
    expect(res.body.name).toBe("rabies2");
  });
});

describe(`DELETE /pet/vaccinations/:id`, () => {
  beforeAll(async () => {
    const res = await request(app)
      .post("/pet/vaccinations")
      .set("Authorization", "Bearer " + token)
      .send({
        name: "rabies",
        scheduledDate: new Date(),
      });
    vaccinationId = res.body._id;
  });

  it("should return 401 if user is not logged in", async () => {
    const res = await request(app).delete(`/pet/vaccinations/${vaccinationId}`);
    expect(res.statusCode).toBe(401);
    expect(res.text).toBe("Unauthorized");
  });
});
