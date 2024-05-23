<template>
  <div class="col-md-12">
    <div class="card card-container">
      <div class="row">
        <div class="col">
          <h3>👐 Rieccoti!</h3>
          <p>
            Bentornato! Speriamo tu stia bene 😊.<br />
            Inserendo qui le tue <strong>credenziali</strong> (<em>email</em> e
            <em>password</em>
            scritte sul post-it attaccato al computer 😉) puoi entrare nel sito!
          </p>
          <Form @submit="loginHandler" :validation-schema="schema">
            <!-- Email -->
            <div class="form-group">
              <label for="email">Email</label>
              <Field id="email" name="email" type="text" class="form-control" />
              <ErrorMessage name="email" class="error-feedback" />
            </div>

            <!-- Password -->
            <div class="form-group">
              <label for="password">Password</label>
              <Field
                id="password"
                name="password"
                type="password"
                class="form-control"
              />
              <ErrorMessage name="password" class="error-feedback" />
            </div>

            <div class="form-group">
              <button
                class="btn btn-block btn-arancione"
                :disabled="caricamento"
              >
                <span
                  v-show="caricamento"
                  class="spinner-border spinner-border-sm"
                ></span>
                <span>Entra</span>
              </button>
            </div>

            <div class="form-group">
              <div v-if="messaggio" class="alert alert-danger" role="alert">
                {{ messaggio }}
              </div>
            </div>
          </Form>
        </div>
        <div class="col-5 d-flex align-items-center">
          <img src="/login.png" class="login-img" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

export default {
  name: "Login",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    // Schema di validazione
    const schema = yup.object().shape({
      email: yup.string().required("È necessario inserire l'email!"),
      password: yup.string().required("È necessario inserire la password!"),
    });

    return {
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
    loginHandler(utente) {
      this.caricamento = true;

      this.$store.dispatch("auth/login", utente).then(
        () => {
          // Reindirizza alla pagina personale
          this.$router.push("/profilo");
        },
        (err) => {
          this.caricamento = false;
          this.messaggio =
            (err.response && err.response.data && err.response.data.message) ||
            err.message ||
            err.toString();
        },
      );
    },
  },
};
</script>

<style scoped>
@import "../global.css";

.card-container.card {
  max-width: 700px !important;
  padding: 40px 40px;
}

.login-img {
  width: 250px;
  height: 250px;
  margin: 0 auto 10px;
  display: block;
}
</style>
