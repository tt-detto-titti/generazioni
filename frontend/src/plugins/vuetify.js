import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import { aliases, mdi } from "vuetify/iconsets/mdi";
import * as directives from "vuetify/directives";
import "@mdi/font/css/materialdesignicons.min.css";

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: "mdi",
    aliases,
    sets: {
      mdi,
    },
  },
  theme: {
    defaultTheme: "light",
  },
});

export { vuetify };
