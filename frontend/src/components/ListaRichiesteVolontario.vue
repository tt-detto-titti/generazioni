<template>
  <div class="col-md-12">
    <div class="card card-container">
      <h3>🫰 Vuoi dare una mano?</h3>
      <p>
        Qui puoi vedere tutte le <strong>richieste d'aiuto</strong> che sono
        ancora <strong>in attesa</strong> di una risposta, se ne trovi una che
        soddisfa le tue disponibilità non esitare ad accettarla!<br />
        Cliccando sulle <strong>icone</strong> in fondo ad ogni riga puoi
        <strong>accettare</strong> la richiesta o
        <strong>visualizzarne i dettagli</strong>.
      </p>
      <div v-if="!ok">
        <v-data-table
          v-model:expanded="expanded"
          :items="richieste"
          :headers="headers"
          :hide-default-footer="true"
          item-value="id"
          disable-pagination
          show-expand
        >
          <!-- Riga espansa -->
          <template v-slot:expanded-row="{ columns, item }">
            <tr>
              <td :colspan="columns.length">
                <strong>{{ item.descrizione }}</strong>
              </td>
            </tr>
          </template>

          <!-- Finestra di dialogo -->
          <template v-slot:top>
            <v-dialog v-model="dialogAccetta" max-width="500px">
              <v-card>
                <v-card-title class="text-h5"
                  >Confermi di voler accettare la richiesta?</v-card-title
                >
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue-darken-1" variant="text" @click="chiudi"
                    >Ho cambiato idea</v-btn
                  >
                  <v-btn color="blue-darken-1" variant="text" @click="conferma"
                    >Conferma</v-btn
                  >
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </template>

          <!-- Pulsante per accettare -->
          <template v-slot:item.accetta="{ item }">
            <v-icon
              icon="fas fa-hand-holding-heart"
              style="color: #e67e22"
              @click="accetta(item)"
            ></v-icon>
          </template>
        </v-data-table>
      </div>

      <div
        v-if="messaggio"
        class="alert"
        :class="ok ? 'alert-success' : 'alert-danger'"
      >
        {{ messaggio }}
      </div>
    </div>
  </div>
</template>

<script>
import ServizioVolontario from "../services/volontario.service";

export default {
  data() {
    return {
      ok: false,
      messaggio: "",
      dialogAccetta: false,
      richiestaAccettata: -1,
      expanded: [],
      richieste: [],
      headers: [
        { title: "Data", key: "data", align: "start", sortable: true },
        { title: "Ora", key: "ora", sortable: false },
        { title: "Categoria", key: "categoria", sortable: true },
        { title: "Durata (min)", key: "durata", sortable: true },
        { title: "Accetta", key: "accetta", sortable: false },
        { title: "", key: "data-table-expand" },
      ],
    };
  },
  watch: {
    dialogAccetta(val) {
      val || this.chiudi();
    },
  },
  methods: {
    async caricaRichieste() {
      try {
        const res = await ServizioVolontario.trovaRichieste();
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
        descrizione: richiesta.descrizione,
      };
    },

    chiudi() {
      this.dialogAccetta = false;
      this.$nextTick(() => {
        this.richiestaAccettata = -1;
      });
    },

    async conferma() {
      try {
        const res = await ServizioVolontario.accettaRichiesta(
          this.richieste[this.richiestaAccettata].id,
        );
        this.messaggio = res.message;
        this.ok = true;

        this.chiudi();
      } catch (err) {
        console.error("Errore nella conferma della richiesta:", err);
      }
    },

    accetta(richiesta) {
      this.richiestaAccettata = this.richieste.indexOf(richiesta);
      this.dialogAccetta = true;
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
</style>
