<script setup>

</script>

<template>
    <RichiestaForm>
        <div class="headers">
            <h1> Data: </h1>
            <h2> Durata: </h2>
            <h3> Descrizione: </h3>
            <h4> Categoria: </h4>
        </div>
        <div class="forms">
            <form @submit_prevent="registerAnswer">
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
            </form>
        </div> 
    </RichiestaForm>
</template>

<script>
export default {
  data() {
    return {
      inpVal: '',
      inpValSubmitted: 'Not submitted yet'
    }
  },
  methods: {
    registerAnswer() {
      if(this.inpVal) {
        this.inpValSubmitted = this.inpVal;
      }
    }
  }
}
</script>

<style scoped>
  div {
    border: dashed black 1px;
    border-radius: 10px;
    padding: 0 20px 20px 20px;
    margin-top: 20px;
    display: inline-block;
  }
  button {
    margin: 10px;
  }
  label {
    display: block;
    width: 80px;
    padding: 5px;
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
</style>
