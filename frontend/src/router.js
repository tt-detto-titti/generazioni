import { createWebHashHistory, createRouter } from "vue-router";
import Home from "./components/Home.vue";
import Login from "./components/Login.vue";
import Signup from "./components/Signup.vue";
import Profilo from "./components/Profilo.vue";

import NuovaRichiesta from "./components/NuovaRichiesta.vue";

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
    path: "/richiesta/add",
    name: "nuovaRichiesta",
    component: NuovaRichiesta,
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
