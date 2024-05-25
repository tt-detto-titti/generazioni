import http from "./http-common.js";
import headerAauth from "./header-auth.js";

// Servizio che dialoga con le API che riguardano le persone anziane
class ServizioAnziano {
  trovaRichieste() {
    let utente = JSON.parse(localStorage.getItem("utente"));
    let url = "/matchmaker/richieste/" + utente.id;
    return http.get(url, { headers: headerAauth() }).then((res) => {
      return res.data;
    });
  }
}

export default new ServizioAnziano();
