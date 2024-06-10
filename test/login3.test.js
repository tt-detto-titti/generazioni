//test case 12
const app = require('./app')
it("test login", async(done) => {
  //login di un email non registrata nel database
  const response = await request(app)
    .post("/api/auth/login")
    .send({
      email: "giuseppe.bianchi@email.com",
      password: "pastaalpesto",
    })
    .set("Accept", "application/json")
    .expect("Content-Type", /json/)
    .expect(200);
  expect(response.status).toBe(404);
  expect(response.body.error).toBe("Impossibile effettuare il login: Utente non trovato!");
  done();
})