const request = require("supertest");
const app = require("../../app");
const { mongoConnect, mongoDisconnect} = require('../../services/mongo')


describe("Launches APT", () =>{
beforeAll(async() =>{
  await mongoConnect();
})

afterAll(async() =>{
  await mongoDisconnect();
})

  describe("Test GET /launches", () => {
    test("It should respond with 200 success", async () => {
      const response = await request(app)
        .get("/v1/launches")
        .expect(200)
        .expect("Content-Type", /json/);
    });
  });
  
  describe("Test POST /launch", () => {
    const completeLaunchData = {
      mission: "Canada Enterprise",
      rocket: "NCC 1701-D",
      target: "Kepler-62 f",
      launchDate: "January 4, 2028", 
    };
  
    const launchDataWithoutDate = {
      mission: "Canada Enterprise",
      rocket: "NCC 1701-D",
      target: "Kepler-62 f",
    };
  
    const launchDataWithInvalidDate = {
      mission: "Canada Enterprise",
      rocket: "NCC 1701-D",
      target: "Kepler-62 f",
      launchDate: "Not a Date",
    };
  
    test("It should respond with 201 success", async () => {
      const response = await request(app)
        .post("/v1/launches")
        .send(completeLaunchData)
        .expect(201)
        .expect("Content-Type", /json/);
  
      const requestDate = new Date(completeLaunchData.launchDate).valueOf();
      //valueOf gives the numerical values
      const responseDate = new Date(response.body.launchDate).valueOf();
      //assertions of jest
      expect(responseDate).toBe(requestDate);
  
      expect(response.body).toMatchObject(launchDataWithoutDate);
    });
  
    test("It should catch missing properties", async () => {
      const response = await request(app)
        .post("/v1/launches")
        .send(launchDataWithInvalidDate)
        .expect(400)
        .expect("Content-Type", /json/);
  
      expect(response.body).toStrictEqual({
        error: "Invaild Lanuch Date",
      });
    });
  
    test("It should catch invalid dates", async () => {
      const response = await request(app)
        .post("/v1/launches")
        .send()
        .expect(400)
        .expect("Content-Type", /json/);
  
      expect(response.body).toStrictEqual({
        error: "Missing required launch Property",
      });
    });
  });
  
  //test fixutre

})



