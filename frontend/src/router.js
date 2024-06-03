import { createWebHashHistory, createRouter } from "vue-router";
import Home from "./views/Home.vue";
import Login from "./views/Login.vue";
import Signup from "./views/Signup.vue";
import Profilo from "./views/Profilo.vue";

import ListaRichiesteAnziano from "./views/ListaRichiesteAnziano.vue";
import NuovaRichiesta from "./views/NuovaRichiesta.vue";
import ListaRichiesteVolontario from "./views/ListaRichiesteVolontario.vue";
import NuovaOfferta from "./views/NuovaOfferta.vue";
import NuovoFeedback from "./views/NuovoFeedback.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/home",
    component: Home,
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/signup",
    component: Signup,
  },
  {
    path: "/profilo",
    name: "profilo",
    component: Profilo,
  },
  {
    path: "/richieste/tutte",
    name: "listaRichiesteAnziano",
    component: ListaRichiesteAnziano,
  },
  {
    path: "/richieste/add",
    name: "nuovaRichiesta",
    component: NuovaRichiesta,
  },
  {
    path: "/richieste/disponibili",
    name: "listaRichiesteVolontario",
    component: ListaRichiesteVolontario,
  },
  {
    path: "/offerte/add",
    name: "nuovaOfferta",
    component: NuovaOfferta,
  },
  {
    path: "/feedback/add/",
    name: "nuovoFeedback",
    component: NuovoFeedback,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
// TODO
// router.beforeEach((to, from, next) => {
//   const paginePubbliche = ["/login", "/signup", "/home"];
//   const pagineAuth = !paginePubbliche.includes(to.path);
//   const loggato = localStorage.getItem("utente");

//   if (pagineAuth && !loggato) {
//     next("/login");
//   } else {
//     next();
//   }
// });

export default router;
