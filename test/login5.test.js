//test case 14
const app = require('./app')
it("test login", async(done) => {
  //login di un utente con email vuota
  const response = await request(app)
    .post("/api/auth/login")
    .send({
      email: "",
      password: "pastaalpesto",
    })
    .set("Accept", "application/json")
    .expect("Content-Type", /json/)
    .expect(200);
  expect(response.status).toBe(401);
  expect(response.body.error).toBe("Impossibile effettuare il login: Utente non trovato!");
  done();
})