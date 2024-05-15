<template>
    <div class="container">
        <header class="jumbotron">
            <h3>
                Profilo di <strong>{{ utenteCorrente.nome + " " + utenteCorrente.cognome }}</strong>
            </h3>
        </header>
        <p>
            <strong>Token: </strong>{{ utenteCorrente.accessToken }}
        </p>
        <p>
            <strong>Id: </strong>{{ utenteCorrente.id }}
            {{ }}
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