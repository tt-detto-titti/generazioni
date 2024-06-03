<template>
  <div class="col-md-12">
    <div class="card card-container">
      <div class="row">
        <div class="col">
          <h3>👋 Ciao!</h3>
          <p>È bello averti qui! ❤️</p>
          <p>Esplora il nostro sito e scopri come possiamo aiutarti.</p>
        </div>
        <div class="col-5 d-flex align-items-center">
          <img src="/logo.png" class="logo" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
};
</script>

<style scoped>
@import "../global.css";

.card-container.card {
  max-width: 900px !important;
  padding: 40px 40px;
}

.logo {
  width: 250px;
  height: 250px;
  margin: 0 auto 10px;
  display: block;
}
</style>
