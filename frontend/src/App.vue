<template>
  <div id="app">
    <nav
      class="navbar navbar-expand navbar-dark shadow-sm"
      style="background-color: #2c3e50"
    >
      <a href="/" class="navbar-brand">
        <!-- img src="/logo.png" width="30" height="30" / -->
        Gener<strong>Azioni</strong>
      </a>
      <!-- Differenziare le route in base al ruolo -->
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
            Richieste
          </router-link>
        </li>
        <li v-if="mostraListaRichiesteVolontario" class="nav-item">
          <router-link to="/richieste/disponibili" class="nav-link">
            <font-awesome-icon icon="list" />
            Richieste
          </router-link>
        </li>
        <li v-if="mostraNuovaRichiesta" class="nav-item">
          <router-link to="/richieste/add" class="nav-link">
            <font-awesome-icon icon="hand-holding-medical" />
            Nuova Richiesta
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
      return this.utenteCorrente && this.utenteCorrente.ruoli.includes("anziano");
    },
    isVolontario() {
      return this.utenteCorrente && this.utenteCorrente.ruoli.includes("volontario");
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
  },
  methods: {
    logOut() {
      this.$store.dispatch("auth/logout");
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
@import "./global.css";
</style>