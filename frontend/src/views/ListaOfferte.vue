<template>
  <div class="col-md-12">
    <div class="card card-container">
      <h3>📋 Le tue offerte d'aiuto</h3>
      <p>
        Qui puoi vedere tutte le <strong>offerte d'aiuto</strong> che hai fatto nel tempo, così non c'è bisogno che
        ricordi tutto!<br />
        Cliccando sulle <strong>icone</strong> in fondo ad ogni riga puoi <strong>modificare</strong> o
        <strong>eliminare</strong> ogni offerta... provare per credere!
      </p>
      <v-data-table :items="offerte" :headers="headers" :hide-default-footer="true" item-value="id" disable-pagination>
      </v-data-table>
    </div>
  </div>
</template>

<script>
  import ServizioVolontario from '../services/volontario.service.js';

  export default {
    data() {
      return {
        expanded: [],
        offerte: [],
        headers: [
          { title: 'Data', key: 'data', align: 'start', sortable: true },
          { title: 'Ora', key: 'ora', sortable: false },
          { title: 'Durata (min)', key: 'durata', sortable: true }
        ]
      };
    },
    methods: {
      async caricaOfferte() {
        try {
          const res = await ServizioVolontario.trovaOfferte();
          this.offerte = Array(res)[0].map(this.mappaOfferta);
        } catch (err) {
          console.error('Errore nel caricamento delle offerte: ', err);
        }
      },
      mappaOfferta(offerta) {
        return {
          id: offerta._id,
          data: new Date(offerta.data).toLocaleDateString(),
          ora: new Date(offerta.data).toLocaleTimeString(),
          durata: offerta.durata
        };
      }
    },
    mounted() {
      this.caricaOfferte();
    }
  };
</script>

<style scoped>
  @import '../global.css';

  .card-container.card {
    max-width: 700px !important;
    padding: 40px 40px;
  }
</style>
