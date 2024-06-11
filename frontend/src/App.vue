<template>
  <div id="app">
    <nav class="navbar sticky-top navbar-expand navbar-dark shadow-sm">
      <a href="/" class="navbar-brand">
        <!-- img src="/logo.png" width="30" height="30" / -->
        Gener<strong>Azioni</strong>
      </a>
      <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link to="/home" class="nav-link">
            <font-awesome-icon icon="home" />
            Home
          </router-link>
        </li>
        <li v-if="mostraListaRichiesteAnziano" class="nav-item">
          <router-link to="/richieste/tutte" class="nav-link">
            <font-awesome-icon icon="list" />
            Gestione Richieste
          </router-link>
        </li>
        <li v-if="mostraListaRichiesteVolontario" class="nav-item">
          <router-link to="/richieste/gestione" class="nav-link">
            <font-awesome-icon icon="list" />
            Gestione Richieste
          </router-link>
        </li>
        <li v-if="mostraListaOfferteVolontario" class="nav-item">
          <router-link to="/offerte/gestione" class="nav-link">
            <font-awesome-icon icon="list" />
            Gestione Offerte
          </router-link>
        </li>
        <li v-if="mostraNuovaRichiesta" class="nav-item">
          <router-link to="/richieste/add" class="nav-link">
            <font-awesome-icon icon="hand-holding-medical" />
            Nuova Richiesta
          </router-link>
        </li>
        <li v-if="mostraNuovaOfferta" class="nav-item">
          <router-link to="/offerte/add" class="nav-link">
            <font-awesome-icon icon="hand-holding-medical" />
            Nuova Offerta
          </router-link>
        </li>
        <li v-if="mostraNuovoFeedback" class="nav-item">
          <router-link to="/feedback/add/" class="nav-link">
            <font-awesome-icon icon="comment" />
            Nuovo Feedback
          </router-link>
        </li>
      </div>

      <div v-if="!utenteCorrente" class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link to="/signup" class="nav-link">
            <font-awesome-icon icon="user-plus" />
            Sign Up
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/login" class="nav-link">
            <font-awesome-icon icon="sign-in-alt" />
            Login
          </router-link>
        </li>
      </div>

      <div v-if="utenteCorrente" class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link to="/profilo" class="nav-link">
            <font-awesome-icon icon="user" />
            {{ utenteCorrente.nome }}
          </router-link>
        </li>
        <li class="nav-item">
          <a class="nav-link" @click.prevent="logOut">
            <font-awesome-icon icon="sign-out-alt" />
            LogOut
          </a>
        </li>
      </div>
    </nav>

    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script>
  export default {
    computed: {
      utenteCorrente() {
        return this.$store.state.auth.utente;
      },
      isAnziano() {
        return this.utenteCorrente && this.utenteCorrente.ruoli.includes('anziano');
      },
      isVolontario() {
        return this.utenteCorrente && this.utenteCorrente.ruoli.includes('volontario');
      },
      mostraListaRichiesteAnziano() {
        return this.isAnziano;
      },
      mostraNuovaRichiesta() {
        return this.isAnziano;
      },
      mostraListaRichiesteVolontario() {
        return this.isVolontario;
      },
      mostraNuovaOfferta() {
        return this.isVolontario;
      },
      mostraNuovoFeedback() {
        return this.isVolontario || this.isAnziano;
      },
      mostraListaOfferteVolontario() {
        return this.isVolontario;
      }
    },
    methods: {
      logOut() {
        this.$store.dispatch('auth/logout');
        this.$router.push('/login');
      }
    }
  };
</script>

<style scoped>
  @import './global.css';
</style>
