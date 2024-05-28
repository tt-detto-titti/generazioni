<script setup></script>

<template>
  <div class="container">
    <div class="card card-container">
      <h3>🤝Vuoi dare una mano?</h3>
      <p>
        Bentornato! Speriamo tu stia bene 😊.<br />
        Qui puoi offire il tuo <strong>aiuto</strong> per
        <strong>un anziano</strong>: che si tratti di aiutare a fare la spesa
        per il pranzo con i nipoti o dare un passaggio in macchina per la visita
        medica... <strong>puoi dare una mano</strong>!
      </p>
      <!-- TODO: Implementare disponibilitaHandler -->
      <Form @submit="disponibilitaHandler" :validation-schema="schema">
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
          <div class="form-group">
            <label for="durata">Durata (min.)</label>
            <Field
              name="durata"
              type="number"
              min="60"
              max="360"
              class="form-control"
            />
            <ErrorMessage name="durata" class="error-feedback" />
          </div>
          <!-- versione con scelta multipla per categoria -->
          <!-- Categoria -->
          <div class="form-check form-check-inline">
            <Field
              name="categoria"
              id="aiuto in casa"
              value="aiuto in casa"
              type="checkbox"
              class="form-check-input"
            />
            <label class="form-check-label" for="aiuto in casa"
              >Aiuto in casa</label
            >
          </div>
          <div class="form-check form-check-inline">
            <Field
              name="categoria"
              id="aiuto fuori casa"
              value="aiuto fuori casa"
              type="checkbox"
              class="form-check-input"
            />
            <label class="form-check-label" for="aiuto fuori casa"
              >Aiuto fuori casa</label
            >
          </div>
          <div class="form-check form-check-inline">
            <Field
              name="categoria"
              id="compagnia"
              value="compagnia"
              type="checkbox"
              class="form-check-input"
            />
            <label class="form-check-label" for="compagnia">Compagnia</label>
          </div>
          <div class="form-check form-check-inline">
            <Field
              name="categoria"
              id="passaggio in macchina"
              value="passaggio in macchina"
              type="checkbox"
              class="form-check-input"
            />
            <label class="form-check-label" for="passaggio in macchina"
              >Passaggio in auto</label
            >
          </div>
        </div>
        <!-- Parte descrizione eliminata -->
        <!-- Stessi campi della richiesta -->
        <div class="form-group">
          <button class="btn btn-primary btn-block" :disabled="caricamento">
            <span
              v-show="caricamento"
              class="spinner-border spinner-border-sm"
            ></span>
            Offri disponibilità
          </button>
        </div>
      </Form>
    </div>
  </div>
</template>

<script>
import ServizioVolontario from "../services/disponibilita.service.js";
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

export default {
  name: "NuovaDisponibilita",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    //Schema di validazione
    const schema = yup.object().shape({
      data: yup.string().required("È necessario inserire la data"),
      tipologia: yup
        .string()
        .required("È necessario inserire la tipologia di aiuto"),
    });
    return {
      //Per data, durata e descrizione aiuto
      caricamento: false,
      contenuto: "",
      ok: false,
      schema,
    };
  },
  methods: {
    disponibilitaHandler(richiesta) {
      this.messaggio = "";
      this.ok = false;
      this.caricamento = true;
      ServizioVolontario.nuovaRichiesta(richiesta).then(
        (res) => {
          this.caricamento = false;
          this.messaggio = res.message;
          this.ok = true;
        },
        (err) => {
          this.messaggio =
            (err.response && err.response.data && err.response.data.message) ||
            err.message ||
            err.toString();
          this.ok = false;
          this.caricamento = false;
        },
      );
    },
  },
};
</script>

<style scoped>
label {
  display: block;
  margin-top: 10px;
}

.card-container.card {
  max-width: 650px !important;
  padding: 40px 40px;
}

.card {
  background-color: #f7f7f7;
  padding: 20px 25px 30px;
  margin: 0 auto 25px;
  margin-top: 50px;
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  border-radius: 2px;
  -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
}

.input-container {
  display: flex;
  width: 100%;
  gap: 10px;
}

.error-feedback {
  color: red;
}
</style>
