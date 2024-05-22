<template>
  <div class="col-md-12">
    <div class="card card-container">
      <img id="profile-img" src="/login.png" class="profile-img-card" />
      <Form @submit="loginHandler" :validation-schema="schema">
        <div class="form-group">
          <label for="email">Email</label>
          <Field name="email" type="text" class="form-control" />
          <ErrorMessage name="email" class="error-feedback" />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <Field name="password" type="password" class="form-control" />
          <ErrorMessage name="password" class="error-feedback" />
        </div>

        <div class="form-group">
          <button class="btn btn-primary btn-block" :disabled="caricamento">
            <span
              v-show="caricamento"
              class="spinner-border spinner-border-sm"
            ></span>
            <span>Entra nel sito</span>
          </button>
        </div>

        <div class="form-group">
          <div v-if="messaggio" class="alert alert-danger" role="alert">
            {{ messaggio }}
          </div>
        </div>
      </Form>
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
label {
  display: block;
  margin-top: 10px;
}

.card-container.card {
  max-width: 350px !important;
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
  width: 150px;
  height: 150px;
  margin: 0 auto 10px;
  display: block;
}

.error-feedback {
  color: red;
}
</style>
