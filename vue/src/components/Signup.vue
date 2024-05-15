<template>
  <div class="col-md-12">
    <div class="card card-container">
      <!-- TODO caricare una nuova icona -->
      <img id="profile-img" src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" class="profile-img-card" />
      <Form @submit="signupHandler" :validation-schema="schema">
        <div v-if="!ok">
          <!-- Nome e Cognome -->
          <!-- TODO fare in modo che la riga prenda tutto lo spazio-->
          <div class="input-container">
            <div class="form-group">
              <label for="nome">Nome</label>
              <Field name="nome" type="text" class="form-control" />
              <ErrorMessage name="nome" class="error-feedback" />
            </div>
            <div class="form-group">
              <label for="cognome">Cognome</label>
              <Field name="cognome" type="text" class="form-control" />
              <ErrorMessage name="cognome" class="error-feedback" />
            </div>
          </div>

          <!-- CF, Residenza e Data di nascita -->
          <div class="input-container">
            <div class="form-group">
              <label for="cf">Codice Fiscale</label>
              <Field name="cf" type="text" class="form-control" />
              <ErrorMessage name="cf" class="error-feedback" />
            </div>
            <div class="form-group">
              <label for="residenza">Indirizzo di residenza</label>
              <Field name="residenza" type="text" class="form-control" />
              <ErrorMessage name="residenza " class="error-feedback" />
            </div>
            <div class="form-group">
              <label for="dataNascita">Data di nascita</label>
              <Field name="dataNascita" type="date" class="form-control" />
              <ErrorMessage name="dataNascita" class="error-feedback" />
            </div>
          </div>

          <!-- Email e Telefono -->
          <div class="input-container">
            <div class="form-group">
              <label for="email">Email</label>
              <Field name="email" type="text" class="form-control" />
              <ErrorMessage name="email" class="error-feedback" />
            </div>
            <div class="form-group">
              <label for="telefono">Telefono</label>
              <Field name="telefono" type="text" class="form-control" />
              <ErrorMessage name="telefono" class="error-feedback" />
            </div>
          </div>

          <!-- Password -->
          <div class="form-group">
            <label for="password">Password</label>
            <Field name="password" type="password" class="form-control" />
            <ErrorMessage name="password" class="error-feedback" />
          </div>

          <!-- Ruoli -->
          <div class="form-check form-check-inline">
            <Field name="ruoli" id="anziano" value="anziano" type="checkbox" class="form-check-input" />
            <label class="form-check-label" for="anziano">Anziano</label>
          </div>
          <div class="form-check form-check-inline">
            <Field name="ruoli" id="volontario" value="volontario" type="checkbox" class="form-check-input" />
            <label class="form-check-label" for="volontario">Volontario</label>
          </div>
          <div class="form-check form-check-inline">
            <Field name="ruoli" id="supervisore" value="supervisore" type="checkbox" class="form-check-input" />
            <label class="form-check-label" for="supervisore">Supervisore</label>
          </div>
          <div class="form-check form-check-inline">
            <Field name="ruoli" id="admin" value="admin" type="checkbox" class="form-check-input" />
            <label class="form-check-label" for="admin">Admin</label>
          </div>

          <div class="form-group">
            <button class="btn btn-primary btn-block" :disabled="caricamento">
              <span v-show="caricamento" class="spinner-border spinner-border-sm"></span>
              Registrati al sito
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
        .max(new Date(Date.now() - 567648000000), "Devi essere almeno maggiorenne.")
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
      ruoli: yup
        .array()
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

      console.log(utente);

      this.$store.dispatch("auth/signup", utente).then(
        (data) => {
          this.messaggio = data.message;
          this.ok = true;
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
        }
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

.input-container {
  display: flex;
  gap: 10px;
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

.profile-img-card {
  width: 96px;
  height: 96px;
  margin: 0 auto 10px;
  display: block;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
}

.error-feedback {
  color: red;
}
</style>