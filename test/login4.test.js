//test case 13
const app = require('./app')
it("test login", async(done) => {
  //login di un utente con password  vuota
  const response = await request(app)
    .post("/api/auth/login")
    .send({
      email: "giuseppe.bianchi@email.com",
      password: "",
    })
    .set("Accept", "application/json")
    .expect("Content-Type", /json/)
    .expect(200);
  expect(response.status).toBe(401);
  expect(response.body.error).toBe("Impossibile effettuare il login: Password non valida!");
  done();
})