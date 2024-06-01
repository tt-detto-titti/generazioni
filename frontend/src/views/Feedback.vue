<script setup>

</script>

<template>
  <div class="container">
    <div class="card card-container">
      <h3>Feedback</h3>
      <p>
        Bentornato!<br />
        Qui puoi dare un <strong>feedback</strong> sull'
        <strong>aiuto offerto o ricevuto</strong>o eventualmente effettuare una <strong>segnalazione</strong>
        di un comportamento scorretto.
      </p>
      <Form @submit="feedbackHandler" :validation-schema="schema">
        <!-- Tipologia di feedback-->
        <div class="input-container">
          <div class="form-group">
            <label for="tipologia">Tipologia di feedback</label>
            <Field name="tipologia" as="select" class="form-control">
              <option value="feedback" selected>Feedback</option>
              <option value="segnalazione">Segnalazione</option>
            </Field>
            <ErrorMessage name="tipologia" class="error-feedback" />
          </div>
        </div>

        <!-- Descrizione feedback-->
        <div class="form-group">
          <label for="descrizione">Descrizione</label>
          <Field name="descrizione" as="textarea" class="form-control" />
          <ErrorMessage name="descrizione" class="error-feedback" />
        </div>

        <!-- Pulsante invia feedback -->
        <div class="form-group">
          <button class="btn btn-primary btn-block" :disabled="caricamento">
            <span
                v-show="caricamento"
                class="spinner-border spinner-border-sm"
            ></span>
            Invia il feedback
          </button>
        </div>
      </Form>
    </div>
  </div>
</template>

<script>
import ServizioFeedback from "../services/feedback.service.js";
import {Form, Field, ErrorMessage} from "vee-validate";
import * as yup from "yup";

export default {
  name: "NuovoFeedback",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data()  {
    // Schema di validazione
    const schema = yup.object().shape({
      tipologia: yup.string().required("È necessario inserire la tipologia!"),
      descrizione: yup.string().required("È necessario inserire la descrizione!"),
    });
    return {
      caricamento: false,
      messaggio: "",
      ok: false,
      schema,
    };
  },
  methods: {
    feedbackHandler(feedback) {
      this.messaggio = "";
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
                (err.response && err.response.data && err.response.data.message) ||
                err.message ||
                err.toString();
            this.ok = false;
            this.caricamento = false;
          },
      );
    }
  },
};
</script>

<style scoped>
@import "../global.css";

.card-container.card {
  max-width: 670px !important;
  padding: 40px 40px;
}

</style>