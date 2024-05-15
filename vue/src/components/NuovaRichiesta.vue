<template>
  <div class="container">
    <header class="jumbotron">
      <h3>{{ contenuto }}</h3>
    </header>
  </div>
</template>

<script>
import ServizioUtente from "../services/utente.service.js";

export default {
  name: "NuovaRichiesta",
  data() {
    return {
      contenuto: "",
    };
  },
  montato() {
    ServizioUtente.getContenutoAnziano().then(
      (res) => {
        this.contenuto = res.data;
      },
      (err) => {
        this.contenuto =
          (err.response && err.response.data && err.response.data.message) ||
          err.message ||
          err.toString();
      }
    );
  },
};
</script>
