//test case 10
const app = require('./app')
const mongoose = require('./mongoose')
it("test login", async(done) => {
  //login di un utente
  const response = await request(app)
   .post("/api/auth/login")
   .send({
      email: "mario.rossi@email.com",
      password: "pastaalpesto",
    })
   .set("Accept", "application/json")
   .expect("Content-Type", /json/)
   .expect(200);
  expect(response.status).toBe(200);
  expect(response.body.isSuccesful).toBe(true);
  expect(response.body.utente.email).toBe("mario.rossi@email.com");
  expect(response.body.utente.ruoli[0]._id).toBeDefined();
  expect(response.body.accessToken).toBeDefined();
  done();
})