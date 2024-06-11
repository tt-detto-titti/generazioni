import http from './http-common.js';
import headerAauth from './header-auth.js';

// Sevizio che dialoga con le API relative ai feedback
class ServizioFeedback {
  trovaFeedback() {
    let utente = JSON.parse(localStorage.getItem('utente'));
    let url = '/feedback/' + utente.id;
    return http.get(url, { headers: headerAauth() }).then((res) => {
      return res.data;
    });
  }

  nuovoFeedback(feedback) {
    return http
      .post(
        '/feedback/add/' + feedback.idRichiesta,
        {
          tipologia: feedback.tipologia,
          descrizione: feedback.descrizione
        },
        { headers: headerAauth() }
      )
      .then((res) => {
        return res.data;
      });
  }
}

export default new ServizioFeedback();
