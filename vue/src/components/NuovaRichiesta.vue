<template>
  <div class="container">
    <header class="jumbotron">
      <h3>{{ contenuto }}</h3>
    </header>
    <div class="card card-container">
      <Form @submit="richiestaHandler" :validation-schema="schema">
        <!-- Campo Data -->
        <div class="form-group">
          <label for="data">Data</label>
          <Field name="data" type="date" class="form-control" />
          <ErrorMessage name="data" class="error-feedback" />
        </div>
        <!-- Campo Durata -->
        <div class="form-group">
              <label for="durata">Durata</label>
              <Field name="durata" type="text" class="form-control" />
              <ErrorMessage name="durata" class="error-feedback" />
          </div>
        <!-- Campo Descrizione -->
        <div class="form-group">
          <label for=""descrizione>Descrizione</label>
          <Field name="descrizione" type="descrizione" class="form-control" />
          <ErrorMessage name="descrizione" class="error-feedback" />
        </div>
      </Form>
      <div class="forms">
      <!-- Campo Tipologia di Aiuto -->
            <Form @submit_prevent="registerAnswer" :validation-schema="schema">
                <p>Categoria di aiuto:</p>
                <label>
                    <input type="radio" name="categoria" v-model="inpVal" value="Aiuto in casa">
                </label>
                <label>
                    <input type="radio" name="categoria" v-model="inpVal" value="Aiuto fuori casa">
                </label>
                <label>
                    <input type="radio" name="categoria" v-model="inpVal" value="Aiuto in casa">
                </label>
                <label>
                    <input type="radio" name="categoria" v-model="inpVal" value="Aiuto in casa">
                </label>
                <button type="submit">Submit</button>
            </Form>
        </div>
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
      tipologia: yup.string().required("È necessario inserire la tipologia di aiuto")
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
      }
    );
  },
  methods: {
    //form data, durata, descrizione
    richiestaHandler(){
      //implementazione
    },
    //scelta multipla tipologia aiuto
    registerAnswer(){
      if(this.inpVal){
        this.inpValSubmitted = this.inpVal;
      }
    }
  }
};
</script>

<style scoped>
label {
  display: block;
  margin-top: 10px;
}

button{
  margin: 10px;
}

label:hover {
    cursor: pointer;
    background-color: rgb(211, 244, 211);
    border-radius: 5px;
  }
#pAnswer {
    background-color: lightgreen;
    padding: 5px;
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
