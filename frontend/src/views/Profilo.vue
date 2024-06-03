<template>
  <div class="col-md-12">
    <div class="card card-container">
      <h3>
        Profilo di <strong>{{ utenteCorrente.nome + " " + utenteCorrente.cognome }}</strong>
      </h3>
      <div class="profile-details">
        <p>
          <strong>Token: </strong>{{ utenteCorrente.accessToken }}
        </p>
        <p>
          <strong>Id: </strong>{{ utenteCorrente.id }}
        </p>
        <p>
          <strong>Email: </strong>{{ utenteCorrente.email }}
        </p>
        <p>
          <strong>Ruoli:</strong>
          <ul>
            <li v-for="ruolo in utenteCorrente.ruoli" :key="ruolo">{{ ruolo }}</li>
          </ul>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Profilo",
  computed: {
    utenteCorrente() {
      return this.$store.state.auth.utente;
    }
  },
  mounted() {
    if (!this.utenteCorrente) {
      this.$router.push("/login");
    }
  }
}
</script>

<style scoped>
@import "../global.css";

.card-container.card {
  max-width: 650px !important;
  padding: 40px 40px;
}
</style>