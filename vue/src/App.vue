<template>
  <div id="app">
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <a class="navbar-brand">GenerAzioni</a>
      <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link to="/home" class="nav-link">
            <font-awesome-icon icon="home" /> Home
          </router-link>
        </li>
        <li v-if="mostraNuovaRichiesta" class="nav-item">
          <router-link to="/richiesta/add" class="nav-link">
            <font-awesome-icon icon="hand-holding-medical" /> Nuova Richiesta
          </router-link>
        </li>
      </div>

      <div v-if="!utenteCorrente" class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link to="/signup" class="nav-link">
            <font-awesome-icon icon="user-plus" /> Sign Up
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/login" class="nav-link">
            <font-awesome-icon icon="sign-in-alt" /> Login
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
            <font-awesome-icon icon="sign-out-alt" /> LogOut
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
    mostraNuovaRichiesta() {
      return true;
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
