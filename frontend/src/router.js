import { createWebHashHistory, createRouter } from "vue-router";
import Home from "./components/Home.vue";
import Login from "./components/Login.vue";
import Signup from "./components/Signup.vue";
import Profilo from "./components/Profilo.vue";

import ListaRichiesteAnziano from "./components/ListaRichiesteAnziano.vue";
import NuovaRichiesta from "./components/NuovaRichiesta.vue";
import ListaRichiesteVolontario from "./components/ListaRichiesteVolontario.vue";
import NuovaOfferta from "./components/NuovaOfferta.vue";

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
    component: NuovaOfferta
  }
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
