<template>
  <div class="col-md-12">
    <div class="card card-container">
      <h3>📋 Le tue richieste d'aiuto</h3>
      <p>
        Qui puoi vedere tutte le <strong>richieste d'aiuto</strong> che hai
        fatto nel tempo, così non c'è bisogno che ricordi tutto!<br/>
        Cliccando sulle <strong>icone</strong> in fondo ad ogni riga puoi
        <strong>modificare</strong>, <strong>eliminare</strong> o
        <strong>visualizzare i dettagli</strong> di ogni richiesta... provare
        per credere!
      </p>
      <v-data-table
          v-model:expanded="expanded"
          :items="richieste"
          :headers="headers"
          :hide-default-footer="true"
          item-value="id"
          disable-pagination
          show-expand
      >
        <template v-slot:item.stato="{ item }">
          <v-chip :class="getClasseStato(item.stato)" dark>
            {{ item.stato }}
          </v-chip>
        </template>
        <template v-slot:expanded-row="{ columns, item }">
          <tr>
            <td :colspan="columns.length">
              <strong>{{ item.descrizione }}</strong>
            </td>
          </tr>
        </template>
      </v-data-table>
    </div>
  </div>
</template>

<script>
import ServizioAnziano from "../services/anziano.service.js";

export default {
  data() {
    return {
      expanded: [],
      richieste: [],
      headers: [
        {title: "Data", key: "data", align: "start", sortable: true},
        {title: "Ora", key: "ora", sortable: false},
        {title: "Categoria", key: "categoria", sortable: true},
        {title: "Durata (min)", key: "durata", sortable: true},
        {title: "Stato", key: "stato", sortable: false},
        {title: "", key: "data-table-expand"},
      ],
    };
  },
  methods: {
    async caricaRichieste() {
      try {
        const res = await ServizioAnziano.trovaRichieste();
        this.richieste = Array(res)[0].map(this.mappaRichieste);
      } catch (err) {
        console.error("Errore nel caricamento delle richieste:", err);
      }
    },
    mappaRichieste(richiesta) {
      return {
        id: richiesta._id,
        data: new Date(richiesta.data).toLocaleDateString(),
        ora: new Date(richiesta.data).toLocaleTimeString(),
        durata: richiesta.durata,
        categoria: richiesta.categoria,
        stato: richiesta.stato,
        descrizione: richiesta.descrizione,
      };
    },
    getClasseStato(stato) {
      switch (stato) {
        case "in attesa":
          return "stato-attesa";
        case "accettata":
          return "stato-accettata";
        case "scaduta":
          return "stato-scaduta";
        default:
          return "";
      }
    },
  },
  mounted() {
    this.caricaRichieste();
  },
};
</script>

<style scoped>
@import "../global.css";

.card-container.card {
  max-width: 700px !important;
  padding: 40px 40px;
}

.stato-attesa {
  background-color: yellow;
  color: black;
}

.stato-accettata {
  background-color: green;
  color: white;
}

.stato-scaduta {
  background-color: red;
  color: white;
}
</style>
