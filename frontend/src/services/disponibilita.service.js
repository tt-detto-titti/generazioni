import http from "./http-common.js";
import headerAauth from "./header-auth.js";

// Servizio che dialoga con le API che riguardano i volontari
class ServizioVolontario {
  trovaDisponibilita() {
    let utente = JSON.parse(localStorage.getItem("utente"));
    let url = "/matchmaker/disponibilita/" + utente.id; //CONTROLLARE PARTE DISPONIBILITA
    return http.get(url, { headers: headerAauth() }).then((res) => {
      return res.data;
    });
  }

  nuovaDisponibilita(disponibilita) {
    return http
      .post(
        "/matchmaker/disponibilita/add", //CONTROLLARE SE GIUSTO
        {
          data: `${disponibilita.data}T${disponibilita.ora}:00Z`,
          durata: disponibilita.durata,
          categoria: disponibilita.categoria,
        },
        { headers: headerAauth() },
      )
      .then((res) => {
        return res.data;
      });
  }
}

export default new ServizioVolontario();
