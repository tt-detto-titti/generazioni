<template>
  <div class="row">
    <div class="col-md-7">
      <div class="card card-container">
        <h3>🫰 Ecco cosa puoi fare!</h3>
        <p>
          Qui puoi vedere tutte le <strong>richieste d'aiuto</strong> che sono
          ancora <strong>in attesa</strong> di una risposta, se ne trovi una che
          soddisfa le tue disponibilità non esitare ad accettarla!<br/>
          Cliccando sulle <strong>icone</strong> in fondo ad ogni riga puoi
          <strong>accettare</strong> la richiesta o
          <strong>visualizzarne i dettagli</strong>.
        </p>
        <div v-if="!ok">
          <v-data-table
              v-model:expanded="expanded"
              :items="richiesteDisponibili"
              :headers="headersDisponibili"
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
                  >Confermi di voler accettare la richiesta?
                  </v-card-title
                  >
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue-darken-1" variant="text" @click="chiudi"
                    >Ho cambiato idea
                    </v-btn
                    >
                    <v-btn color="blue-darken-1" variant="text" @click="conferma"
                    >Conferma
                    </v-btn
                    >
                    <v-spacer></v-spacer>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </template>

            <!-- Categoria -->
            <template v-slot:item.categoria="{ item }">
              <v-chip :class="getClasseCategoria(item.categoria)">
                {{ item.categoria }}
              </v-chip>
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
    <div class="col-md-5">
      <div class="card card-container">
        <h3>📋 Le tue richieste accettate</h3>
        <p>
          Qui puoi vedere tutte le <strong>richieste d'aiuto</strong> che hai <strong>accettato</strong>.<br/>
        </p>
        <v-data-table
            v-model:expanded="expanded"
            :items="richiesteAccettate"
            :headers="headersAccettate"
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

          <!-- Categoria -->
          <template v-slot:item.categoria="{ item }">
            <v-chip :class="getClasseCategoria(item.categoria)">
              {{ item.categoria }}
            </v-chip>
          </template>
        </v-data-table>
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
      richiestaSelezionata: -1,
      expanded: [],
      richiesteDisponibili: [],
      richiesteAccettate: [],
      headersDisponibili: [
        {
          title: "Data",
          key: "data",
          align: "start",
          sortable: true,
          headerProps: {class: "px-1"},
          cellProps: {class: "px-1"},
        },
        {
          title: "Ora",
          key: "ora",
          sortable: false,
          headerProps: {class: "px-1"},
          cellProps: {class: "px-1"}
        },
        {
          title: "Categoria",
          key: "categoria",
          sortable: true,
          headerProps: {class: "px-1"},
          cellProps: {class: "px-1"}
        },
        {
          title: "Durata (min)",
          key: "durata",
          sortable: true,
          headerProps: {class: "px-1"},
          cellProps: {class: "px-1"}
        },
        {
          title: "Accetta",
          key: "accetta",
          sortable: false,
          headerProps: {class: "px-1"},
          cellProps: {class: "px-1"}
        },
        {
          title: "",
          key: "data-table-expand",
          headerProps: {class: "px-1"},
          cellProps: {class: "px-1"}
        },
      ],
      headersAccettate: [
        {
          title: "Data",
          key: "data",
          align: "start",
          sortable: true,
          headerProps: {class: "px-1"},
          cellProps: {class: "px-1"},
        },
        {
          title: "Ora",
          key: "ora",
          sortable: false,
          headerProps: {class: "px-1"},
          cellProps: {class: "px-1"}
        },
        {
          title: "Categoria",
          key: "categoria",
          sortable: true,
          headerProps: {class: "px-1"},
          cellProps: {class: "px-1"}
        },
        {
          title: "Durata (min)",
          key: "durata",
          sortable: true,
          headerProps: {class: "px-1"},
          cellProps: {class: "px-1"}
        },
        {
          title: "",
          key: "data-table-expand",
          headerProps: {class: "px-1"},
          cellProps: {class: "px-1"}
        },
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
        let utente = JSON.parse(localStorage.getItem("utente"));
        const disponibili = await ServizioVolontario.trovaRichiesteDisponibili();
        const accettate = await ServizioVolontario.trovaRichiesteAccettate(utente.id);

        this.richiesteDisponibili = Array(disponibili)[0].map(this.mappaRichieste);
        this.richiesteAccettate = Array(accettate)[0].map(this.mappaRichieste);
      } catch (err) {
        console.error("Errore nel caricamento delle richieste:", err);
      }
    },

    mappaRichieste(richiesta) {
      return {
        id: richiesta._id,
        data: new Date(richiesta.data).toLocaleDateString(),
        ora: new Date(richiesta.data).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}),
        durata: richiesta.durata,
        categoria: richiesta.categoria,
        descrizione: richiesta.descrizione,
      };
    },

    chiudi() {
      this.dialogAccetta = false;
      this.$nextTick(() => {
        this.richiestaSelezionata = -1;
      });
    },

    async conferma() {
      try {
        const res = await ServizioVolontario.accettaRichiesta(
            this.richiesteDisponibili[this.richiestaSelezionata].id,
        );
        this.messaggio = res.message;
        this.ok = true;

        this.chiudi();
      } catch (err) {
        console.error("Errore nella conferma della richiesta:", err);
      }
    },

    accetta(richiesta) {
      this.richiestaSelezionata = this.richiesteDisponibili.indexOf(richiesta);
      this.dialogAccetta = true;
    },

    getClasseCategoria(categoria) {
      switch (categoria) {
        case "aiuto in casa":
          return "aiuto-in-casa";
        case "aiuto fuori casa":
          return "aiuto-fuori-casa";
        case "compagnia":
          return "compagnia";
        case "passaggio in macchina":
          return "passaggio-in-macchina";
      }
    }
  },
  mounted() {
    this.caricaRichieste();
  },
};
</script>

<style scoped>
@import "../global.css";

.card-container.card {
  max-width: 630px !important;
  padding: 40px 40px;
}

.aiuto-in-casa {
  background-color: #E91E63;
  color: white;
}

.aiuto-fuori-casa {
  background-color: #9C27B0;
  color: white;
}

.compagnia {
  background-color: #673AB7;
  color: white;
}

.passaggio-in-macchina {
  background-color: #3F51B5;
  color: white;
}
</style>
