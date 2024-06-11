<template>
  <div class="col-md-12">
    <div class="card card-container">
      <h3>🤝 Vuoi dare una mano?</h3>
      <p>
        Bentornato! Speriamo tu stia bene 😊.<br />
        Qui puoi offire il tuo <strong>aiuto</strong> alle <strong>persone anziane</strong> che ne fanno richiesta: che
        si tratti di aiutare a fare la spesa per il pranzo con i nipoti o dare un passaggio in macchina per la visita
        medica... <strong>puoi dare una mano</strong>!
      </p>
      <Form @submit="offertaHandler" :validation-schema="schema">
        <div v-if="!ok">
          <!-- Data, Ora e Categoria-->
          <div class="input-container">
            <div class="form-group">
              <label for="data">Data</label>
              <Field id="data" name="data" type="date" class="form-control" />
              <ErrorMessage name="data" class="error-feedback" />
            </div>
            <div class="form-group">
              <label for="ora">Ora</label>
              <Field id="ora" name="ora" type="time" class="form-control" />
              <ErrorMessage name="ora" class="error-feedback" />
            </div>
            <div class="form-group w-50">
              <label for="durata">Durata (min.)</label>
              <Field id="durata" name="durata" type="number" min="60" max="360" class="form-control" />
              <ErrorMessage name="durata" class="error-feedback" />
            </div>

            <!-- Categoria -->
            <div class="form-group w-100">
              <label for="categorie">Categorie</label>
              <Field id="categorie" name="categorie" as="select" multiple class="form-control">
                <option value="aiuto in casa">Aiuto in casa</option>
                <option value="aiuto fuori casa">Aiuto fuori casa</option>
                <option value="compagnia">Compagnia</option>
                <option value="passaggio in macchina">Passaggio in macchina</option>
              </Field>
            </div>
          </div>

          <div class="form-group">
            <button class="btn btn-arancione btn-block" :disabled="caricamento">
              <span v-show="caricamento" class="spinner-border spinner-border-sm"></span>
              Offri disponibilità
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
  import ServizioVolontario from '../services/volontario.service.js';
  import { Form, Field, ErrorMessage } from 'vee-validate';
  import * as yup from 'yup';

  export default {
    name: 'NuovaDisponibilita',
    components: {
      Form,
      Field,
      ErrorMessage
    },
    data() {
      // Schema di validazione
      const schema = yup.object().shape({
        data: yup.date().min(new Date(), 'La data deve essere nel futuro.').required('È necessario inserire la data!'),
        ora: yup.string().required("È necessario inserire l'ora!"),
        durata: yup
          .number()
          .min(30, 'La durata minima è di 30 minuti!')
          .max(180, 'La durata massima è di 180 minuti!')
          .required('È necessario inserire la durata!'),
        categorie: yup.array().of(yup.string()).min(1, 'È necessario selezionare almeno una categoria!')
      });
      return {
        caricamento: false,
        messaggio: '',
        ok: false,
        schema
      };
    },
    methods: {
      offertaHandler(offerta) {
        this.messaggio = '';
        this.ok = false;
        this.caricamento = true;

        ServizioVolontario.nuovaOfferta(offerta).then(
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
    max-width: 670px !important;
    padding: 40px 40px;
  }
</style>
