<template>
  <div class="container">
    <div class="card card-container">
      <h3>💬 Dicci tutto!</h3>
      <p>
        Com'è andata? 😊<br />
        Qui puoi dare un <strong>feedback</strong> sull'<strong>aiuto {{ this.tipologia_aiuto }}</strong
        >, o eventualmente effettuare la <strong>segnalazione</strong> di un <strong>comportamento scorretto</strong>.
        Siamo pronti ad ascoltarti!
      </p>
      <Form @submit="feedbackHandler" :validation-schema="schema">
        <div v-if="!ok">
          <div class="row">
            <div class="input-container col">
              <!-- Descrizione feedback-->
              <div class="form-group w-100">
                <label for="descrizione">Descrizione</label>
                <Field name="descrizione" as="textarea" class="form-control h-50" />
                <ErrorMessage name="descrizione" class="error-feedback" />
              </div>
            </div>
            <div class="input-container col flex-column">
              <!-- Tipologia di feedback-->
              <div class="form-group w-100">
                <label for="tipologia">Tipologia di feedback</label>
                <Field name="tipologia" as="select" class="form-control">
                  <option value="feedback" selected>Feedback</option>
                  <option value="segnalazione">Segnalazione</option>
                </Field>
                <ErrorMessage name="tipologia" class="error-feedback" />
              </div>

              <!-- Richiesta selezionata -->
              <div class="form-group w-100">
                <label for="idRichiesta">Richiesta di aiuto</label>
                <Field name="idRichiesta" as="select" class="form-control">
                  <option v-for="richiesta in richieste" :key="richiesta._id" :value="richiesta._id">
                    {{ new Date(richiesta.data).toLocaleDateString() }}
                    {{ new Date(richiesta.data).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }}:
                    {{ richiesta.categoria }}
                  </option>
                </Field>
                <ErrorMessage name="richiesta" class="error-feedback" />
              </div>
            </div>
          </div>

          <!-- Pulsante invia feedback -->
          <div class="form-group">
            <button class="btn btn-arancione btn-block" :disabled="caricamento">
              <span v-show="caricamento" class="spinner-border spinner-border-sm"></span>
              Invia
            </button>
          </div>
        </div>
      </Form>

      <div v-if="messaggio" class="alert" :class="ok ? 'alert-success' : 'alert-danger'">
        {{ messaggio }}
      </div>
    </div>
  </div>
</template>

<script>
  import ServizioFeedback from '../services/feedback.service.js';
  import ServizioVolontario from '../services/volontario.service.js';
  import ServizioAnziano from '../services/anziano.service.js';
  import { Form, Field, ErrorMessage } from 'vee-validate';
  import * as yup from 'yup';

  export default {
    name: 'NuovoFeedback',
    components: {
      Form,
      Field,
      ErrorMessage
    },
    data() {
      // Schema di validazione
      const schema = yup.object().shape({
        tipologia: yup.string().required('È necessario inserire la tipologia!'),
        descrizione: yup.string().required('È necessario inserire la descrizione!')
      });

      return {
        ruolo: '',
        tipologia_aiuto: '',
        richieste: [],
        caricamento: false,
        messaggio: '',
        ok: false,
        schema
      };
    },
    async mounted() {
      const utente = JSON.parse(localStorage.getItem('utente'));

      if (utente.ruoli.includes('anziano')) {
        this.ruolo = 'anziano';
      } else if (utente.ruoli.includes('volontario')) {
        this.ruolo = 'volontario';
      } else {
        // Se non sei un anziano o un volontario vieni rimandato alla Home
        this.$router.push('/');
      }

      this.tipologia_aiuto = this.ruolo === 'anziano' ? 'ricevuto' : 'offerto';

      try {
        if (this.ruolo === 'anziano') {
          this.richieste = await ServizioAnziano.trovaRichieste(utente.id);
        } else {
          this.richieste = await ServizioVolontario.trovaRichiesteAccettate(utente.id);
        }
      } catch (err) {
        console.error('Errore nel caricamento delle richieste:', err);
      }
    },
    methods: {
      feedbackHandler(feedback) {
        this.messaggio = '';
        this.ok = false;
        this.caricamento = true;

        ServizioFeedback.nuovoFeedback(feedback).then(
          (res) => {
            this.caricamento = false;
            this.messaggio = res.message;
            this.ok = true;
          },
          (err) => {
            this.messaggio =
              (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
            this.ok = false;
            this.caricamento = false;
          }
        );
      }
    }
  };
</script>

<style scoped>
  @import '../global.css';

  .card-container.card {
    max-width: 550px !important;
    padding: 40px 40px;
  }
</style>
