import http from "./http-common.js";
import headerAauth from "./header-auth.js";

// Servizio che dialoga con le API relative ai volontari
class ServizioVolontario {
  trovaRichieste() {
    const url = "/matchmaker/richieste/disponibili";
    return http.get(url, { headers: headerAauth() }).then((res) => {
      return res.data;
    });
  }

  accettaRichiesta(idRichiesta) {
    const url = "/matchmaker/richieste/accetta/" + idRichiesta;
    return http.post(url, {}, { headers: headerAauth() }).then((res) => {
      return res.data;
    });
  }
}

export default new ServizioVolontario();
