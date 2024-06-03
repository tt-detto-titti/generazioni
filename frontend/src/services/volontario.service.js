import http from "./http-common.js";
import headerAauth from "./header-auth.js";

// Servizio che dialoga con le API relative ai volontari
class ServizioVolontario {
    trovaRichiesteDisponibili() {
        const url = "/matchmaker/richieste/disponibili";
        return http.get(url, {headers: headerAauth()}).then((res) => {
            return res.data;
        });
    }

    trovaRichiesteAccettate(idVolontario) {
        const url = "/matchmaker/richieste/accettate/" + idVolontario;
        return http.get(url, {headers: headerAauth()}).then((res) => {
            return res.data;
        });
    }

    accettaRichiesta(idRichiesta) {
        const url = "/matchmaker/richieste/accetta/" + idRichiesta;
        return http.post(url, {}, {headers: headerAauth()}).then((res) => {
            return res.data;
        });
    }

  trovaOfferte() {
    let utente = JSON.parse(localStorage.getItem("utente"));
    let url = "/matchmaker/offerte/" + utente.id;
    return http.get(url, { headers: headerAauth() }).then((res) => {
      return res.data;
    });
  }

  nuovaOfferta(offerta) {
    return http
      .post(
        "/matchmaker/offerte/add",
        {
          data: `${offerta.data}T${offerta.ora}:00Z`,
          durata: offerta.durata,
          categorie: offerta.categorie,
        },
        { headers: headerAauth() },
      )
      .then((res) => {
        return res.data;
      });
  }
}

export default new ServizioVolontario();
