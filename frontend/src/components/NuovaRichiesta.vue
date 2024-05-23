<template>
  <div class="container">
    <div class="card card-container">
      <h3>🤝 Serve una mano?</h3>
      <p>
        Bentornato! Speriamo tu stia bene 😊.<br />
        Qui puoi chiedere un <strong>aiuto</strong> per
        <strong>tutto quello di cui hai bisogno</strong>: che si tratti di
        andare a fare la spesa per il pranzo con i nipoti o un passaggio in
        macchina per la visita medica... <strong>ti aiutiamo noi</strong>!
      </p>
      <Form @submit="richiestaHandler" :validation-schema="schema">
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
              min="30"
              max="180"
              class="form-control"
            />
            <ErrorMessage name="durata" class="error-feedback" />
          </div>
          <div class="form-group">
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
          <button class="btn btn-primary btn-block" :disabled="caricamento">
            <span
              v-show="caricamento"
              class="spinner-border spinner-border-sm"
            ></span>
            Invia la richiesta
          </button>
        </div>
      </Form>
    </div>
  </div>
</template>

<script>
import ServizioUtente from "../services/utente.service.js";
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

export default {
  name: "NuovaRichiesta",
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
      schema,
      //Per scelta multipla tipologia aiuto
      inpVal: "",
      inpValSubmitted: "Not submitted yet",
    };
  },
  montato() {
    ServizioUtente.getContenutoAnziano().then(
      (res) => {
        this.contenuto = res.data;
      },
      (err) => {
        this.contenuto =
          (err.response && err.response.data && err.response.data.message) ||
          err.message ||
          err.toString();
      },
    );
  },
  methods: {
    richiestaHandler() {
      // TODO implementare
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
