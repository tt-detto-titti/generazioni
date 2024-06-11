<template>
  <div class="container">
    <div class="card card-container">
      <h3>🤝 Serve una mano?</h3>
      <p>
        Bentornato! Speriamo tu stia bene 😊.<br />
        Qui puoi chiedere un <strong>aiuto</strong> per <strong>tutto quello di cui hai bisogno</strong>: che si tratti
        di andare a fare la spesa per il pranzo con i nipoti o un passaggio in macchina per la visita medica...
        <strong>ti aiutiamo noi</strong>!
      </p>
      <Form @submit="richiestaHandler" :validation-schema="schema">
        <div v-if="!ok">
          <!-- Data, Ora  e Categoria-->
          <div class="input-container">
            <div class="form-group">
              <label for="data">Data</label>
              <Field name="data" type="date" class="form-control" />
              <ErrorMessage name="data" class="error-feedback" />
            </div>
            <div class="form-group">
              <label for="ora">Ora</label>
              <Field name="ora" type="time" class="form-control" />
              <ErrorMessage name="ora" class="error-feedback" />
            </div>
            <div class="form-group w-75">
              <label for="durata">Durata (min.)</label>
              <Field name="durata" type="number" min="30" max="180" class="form-control" />
              <ErrorMessage name="durata" class="error-feedback" />
            </div>
            <div class="form-group w-100">
              <label for="categoria">Categoria di aiuto</label>
              <Field name="categoria" as="select" class="form-control">
                <option value="aiuto in casa" selected>Aiuto in casa</option>
                <option value="aiuto fuori casa">Aiuto fuori casa</option>
                <option value="compagnia">Compagnia</option>
                <option value="passaggio in macchina">Passaggio in auto</option>
              </Field>
              <ErrorMessage name="categoria" class="error-feedback" />
            </div>
          </div>

          <!-- Descrizione -->
          <div class="form-group">
            <label for="descrizione">Descrizione</label>
            <Field name="descrizione" as="textarea" class="form-control" />
            <ErrorMessage name="descrizione" class="error-feedback" />
          </div>

          <div class="form-group">
            <button class="btn btn-block btn-arancione" :disabled="caricamento">
              <span v-show="caricamento" class="spinner-border spinner-border-sm"></span>
              <span v-show="!caricamento">Invia la richiesta</span>
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
  import ServizioAnziano from '../services/anziano.service.js';
  import { Form, Field, ErrorMessage } from 'vee-validate';
  import * as yup from 'yup';

  export default {
    name: 'NuovaRichiesta',
    components: {
      Form,
      Field,
      ErrorMessage
    },
    data() {
      //Schema di validazione
      const schema = yup.object().shape({
        data: yup.date().min(new Date(), 'La data deve essere futura').required('È necessario inserire la data!'),
        ora: yup.string().required("È necessario inserire l'ora!"),
        durata: yup
          .number()
          .min(30, 'La durata minima è di 30 minuti')
          .max(180, 'La durata massima è di 180 minuti')
          .required('È necessario inserire la durata!'),
        categoria: yup.string().required('È necessario inserire la categoria di aiuto!'),
        descrizione: yup.string().required('È necessario inserire una descrizione!')
      });
      return {
        caricamento: false,
        messaggio: '',
        ok: false,
        schema
      };
    },
    methods: {
      richiestaHandler(richiesta) {
        this.messaggio = '';
        this.ok = false;
        this.caricamento = true;

        ServizioAnziano.nuovaRichiesta(richiesta).then(
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
    max-width: 650px !important;
  }
</style>
