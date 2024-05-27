import http from "./http-common.js";
import headerAauth from "./header-auth.js";

// Servizio che dialoga con le API che riguardano le persone anziane
class ServizioAnziano {
  trovaRichieste() {
    const utente = JSON.parse(localStorage.getItem("utente"));
    const url = "/matchmaker/richieste/" + utente.id;
    return http.get(url, { headers: headerAauth() }).then((res) => {
      return res.data;
    });
  }
}

export default new ServizioAnziano();
