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

  nuovaRichiesta(richiesta) {
    return http
      .post(
        "/matchmaker/richieste/add",
        {
          // TODO risolvere un problema con l'ora, quando viene salvata nel database vengono aggiunte due ore
          data: `${richiesta.data}T${richiesta.ora}:00Z`,
          durata: richiesta.durata,
          descrizione: richiesta.descrizione,
          categoria: richiesta.categoria,
        },
        { headers: headerAauth() },
      )
      .then((res) => {
        return res.data;
      });
  }
}

export default new ServizioAnziano();
