import http from './http-common.js';
import headerAauth from './header-auth.js';

// Servizio che dialoga con le API che riguardano le persone anziane
class ServizioAnziano {
  trovaRichieste(idAnziano) {
    let url = '/matchmaker/richieste/' + idAnziano;
    return http.get(url, { headers: headerAauth() }).then((res) => {
      return res.data;
    });
  }

  nuovaRichiesta(richiesta) {
    return http
      .post(
        '/matchmaker/richieste/add',
        {
          data: `${richiesta.data}T${richiesta.ora}:00Z`,
          durata: richiesta.durata,
          descrizione: richiesta.descrizione,
          categoria: richiesta.categoria
        },
        { headers: headerAauth() }
      )
      .then((res) => {
        return res.data;
      });
  }
}

export default new ServizioAnziano();
