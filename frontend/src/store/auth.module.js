import ServizioAuth from '../services/auth.service.js';

const utente = JSON.parse(localStorage.getItem('utente'));
const statoIniziale = utente ? { loggato: true, utente } : { loggato: false, utente: null };

export const auth = {
  namespaced: true,
  state: statoIniziale,
  actions: {
    login({ commit }, utente) {
      return ServizioAuth.login(utente).then(
        (utente) => {
          commit('loginSuccess', utente);
          return Promise.resolve(utente);
        },
        (err) => {
          commit('loginFailure');
          return Promise.reject(err);
        }
      );
    },
    logout({ commit }) {
      ServizioAuth.logout();
      commit('logout');
    },
    signup({ commit }, utente) {
      return ServizioAuth.signup(utente).then(
        (res) => {
          commit('signupSuccess');
          return Promise.resolve(res.data);
        },
        (err) => {
          commit('signupFailure');
          return Promise.reject(err);
        }
      );
    }
  },
  mutations: {
    loginSuccess(stato, utente) {
      stato.loggato = true;
      stato.utente = utente;
    },
    loginFailure(stato) {
      stato.loggato = false;
      stato.utente = null;
    },
    logout(stato) {
      stato.loggato = false;
      stato.utente = null;
    },
    signupSuccess(stato) {
      stato.loggato = false;
    },
    signupFailure(stato) {
      stato.loggato = false;
    }
  }
};
