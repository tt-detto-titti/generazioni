import http from "./http-common.js";

// Servizio che dialoga con le API di autenticazione
class ServizioAuth {
  login(utente) {
    return http
      .post("/auth/login", {
        email: utente.email,
        password: utente.password,
      })
      .then((res) => {
        // Se è stato restituito un token lo aggiungo al local storage
        if (res.data.accessToken) {
          localStorage.setItem("utente", JSON.stringify(res.data));
        }

        return res.data;
      });
  }

  logout() {
    localStorage.removeItem("utente");
  }

  signup(utente) {
    return http.post("/auth/signup", {
      nome: utente.nome,
      cognome: utente.cognome,
      cf: utente.cf,
      dataNascita: utente.dataNascita,
      residenza: utente.residenza,
      telefono: utente.telefono,
      email: utente.email,
      password: utente.password,
      ruoli: utente.ruoli,
    });
  }
}

export default new ServizioAuth();
