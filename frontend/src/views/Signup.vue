<template>
  <div class="col-md-12">
    <div class="card card-container">
      <div v-if="!ok" class="row">
        <div class="col">
          <h3>🤟 Benvenuto/a!</h3>
          <p>
            È sempre bello conoscere una persona nuova! ❤️<br />
            Inserendo qui alcune tue <strong>informazioni</strong> puoi
            registrarti a <em>Gener<strong>Azioni</strong></em> e iniziare
            subito a usare il sito!
          </p>
          <Form @submit="signupHandler" :validation-schema="schema">
            <!-- Nome, Cognome e Data di nascita-->
            <div class="input-container">
              <div class="form-group">
                <label for="nome">Nome</label>
                <Field id="nome" name="nome" type="text" class="form-control" />
                <ErrorMessage name="nome" class="error-feedback" />
              </div>
              <div class="form-group">
                <label for="cognome">Cognome</label>
                <Field
                  id="cognome"
                  name="cognome"
                  type="text"
                  class="form-control"
                />
                <ErrorMessage name="cognome" class="error-feedback" />
              </div>
              <div class="form-group">
                <label for="dataNascita">Data di nascita</label>
                <Field
                  id="dataNascita"
                  name="dataNascita"
                  type="date"
                  class="form-control"
                />
                <ErrorMessage name="dataNascita" class="error-feedback" />
              </div>
            </div>

            <!-- CF e Residenza -->
            <div class="input-container">
              <div class="form-group w-100">
                <label for="cf">Codice Fiscale</label>
                <Field id="cf" name="cf" type="text" class="form-control" />
                <ErrorMessage name="cf" class="error-feedback" />
              </div>
              <div class="form-group w-100">
                <label for="residenza">Indirizzo di residenza</label>
                <Field
                  id="residenza"
                  name="residenza"
                  type="text"
                  class="form-control"
                />
                <ErrorMessage name="residenza " class="error-feedback" />
              </div>
            </div>

            <!-- Email e Telefono -->
            <div class="input-container">
              <div class="form-group w-100">
                <label for="email">Email</label>
                <Field
                  id="email"
                  name="email"
                  type="text"
                  class="form-control"
                />
                <ErrorMessage name="email" class="error-feedback" />
              </div>
              <div class="form-group w-100">
                <label for="telefono">Telefono</label>
                <Field
                  id="telefono"
                  name="telefono"
                  type="text"
                  class="form-control"
                />
                <ErrorMessage name="telefono" class="error-feedback" />
              </div>
            </div>

            <!-- Password e Ruoli-->
            <div class="input-container">
              <div class="form-group w-100">
                <label for="password">Password</label>
                <Field
                  id="password"
                  name="password"
                  type="password"
                  class="form-control"
                />
                <ErrorMessage name="password" class="error-feedback" />
              </div>
              <div class="form-group w-100">
                <label for="ruoli">Ruoli</label>
                <Field
                  id="ruoli"
                  name="ruoli"
                  as="select"
                  multiple
                  class="form-control"
                >
                  <option value="anziano" selected>Anziano</option>
                  <option value="volontario">Volontario</option>
                  <option value="supervisore">Supervisore</option>
                  <option value="admin">Admin</option>
                </Field>
              </div>
            </div>

            <div class="form-group">
              <button
                class="btn btn-arancione btn-block"
                :disabled="caricamento"
              >
                <span
                  v-show="caricamento"
                  class="spinner-border spinner-border-sm"
                ></span>
                Registrati
              </button>
            </div>
          </Form>
        </div>
        <div class="col-5 d-flex align-items-center">
          <img src="/signup.png" class="signup-img" />
        </div>
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
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

export default {
  name: "Signup",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    // Schema di validazione
    const schema = yup.object().shape({
      nome: yup
        .string()
        .required("È necessario inserire il nome!")
        .max(25, "Sono consentiti al massimo 25 caratteri."),
      cognome: yup
        .string()
        .required("È necessario inserire il cognome!")
        .max(25, "Sono consentiti al massimo 25 caratteri."),
      cf: yup
        .string()
        .required("È necessario inserire il codice fiscale!")
        .length(16, "Codice Fiscale non corretto."),
      residenza: yup
        .string()
        .required("È necessario inserire l'indirizzo di residenza!")
        .max(50, "Sono consentiti al massimo 50 caratteri."),
      dataNascita: yup
        .date()
        .required("È necessario inserire la data di nascita!")
        .max(
          new Date(Date.now() - 567648000000),
          "Devi essere almeno maggiorenne.",
        )
        .min(new Date(1900, 0, 1), "Non sei Matusalemme."),
      email: yup
        .string()
        .required("È necessario inserire l'email!")
        .email("Email non valida."),
      telefono: yup
        .string()
        .required("È necessario inserire il numero di telefono!"),
      password: yup
        .string()
        .required("È necessario inserire la password!")
        .min(8, "Dev'essere lunga almeno 8 caratteri.")
        .max(32, "Dev'essere lunga al massimo 32 caratteri."),
      ruoli: yup.array(),
    });

    return {
      ok: false,
      caricamento: false,
      messaggio: "",
      schema,
    };
  },
  computed: {
    loggato() {
      return this.$store.state.auth.loggato;
    },
  },
  mounted() {
    // Se l'utente è già loggato rimanda alla pagina personale
    if (this.loggato) {
      this.$router.push("/profilo");
    }
  },
  methods: {
    signupHandler(utente) {
      this.messaggio = "";
      this.ok = false;
      this.caricamento = true;

      this.$store.dispatch("auth/signup", utente).then(
        (data) => {
          this.messaggio = data.message;
          this.ok = true; // Nasconde il form
          this.caricamento = false;
        },
        (error) => {
          this.messaggio =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          this.ok = false;
          this.caricamento = false;
        },
      );
    },
  },
};
</script>

<style scoped>
@import "../global.css";

.card-container.card {
  max-width: 900px !important;
}

.signup-img {
  width: 250px;
  height: 250px;
  margin: 0 auto 10px;
  display: block;
}
</style>
