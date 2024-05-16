import http from "./http-common.js";
import headerAauth from "./header-auth.js";

// Sevizio che dialoga con le API relative agli utenti
class ServizioUtente {
  getContenutoPubblico() {
    return http.get("/test/tutti");
  }

  getContenutoUtente() {
    return http.get("/test/utente", { headers: headerAauth() });
  }

  getContenutoAnziano() {
    return http.get("/test/anziano", { headers: headerAauth() });
  }

  getContenutoAdmin() {
    return http.get("/test/admin", { headers: headerAauth() });
  }
}

export default new ServizioUtente();
