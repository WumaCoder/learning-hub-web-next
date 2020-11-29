import Button from "primevue/Button.vue";

const useComponents = {
  Button,
};

export default {
  install(app) {
    Object.keys(useComponents).forEach((key) => {
      app.component(key, useComponents[key]);
    });
  },
};
