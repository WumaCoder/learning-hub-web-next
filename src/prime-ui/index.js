import "primevue/resources/themes/saga-blue/theme.css"; //theme
import "primevue/resources/primevue.min.css"; //core css
import "primeicons/primeicons.css"; //icons
import "primeflex/primeflex.css";

import Button from "primevue/button";
import Menubar from "primevue/menubar";
import InputText from "primevue/inputtext";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Fieldset from "primevue/fieldset";
import Panel from "primevue/panel";
import Chart from "primevue/chart";
import Dropdown from "primevue/dropdown";
import SelectButton from "primevue/selectbutton";
import ToastService from "primevue/toastservice";
import Toast from "primevue/toast";
import ProgressSpinner from "primevue/progressspinner";
import RadioButton from "primevue/radiobutton";
import Message from "primevue/message";
import Checkbox from "primevue/checkbox";

const useComponents = {
  Button,
  Menubar,
  InputText,
  DataTable,
  Column,
  Fieldset,
  Panel,
  Chart,
  Dropdown,
  SelectButton,
  Toast,
  ProgressSpinner,
  RadioButton,
  Message,
  Checkbox,
};

const prev = "P";

export default {
  install(app) {
    Object.keys(useComponents).forEach((key) => {
      app.component(prev + key, useComponents[key]);
    });
    app.use(ToastService);
  },
};
