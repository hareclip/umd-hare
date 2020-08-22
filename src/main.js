// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import BootstrapVue from "bootstrap-vue";
import axios from "axios";
import commonmark from "commonmark";
import moment from "moment";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

import App from "./App";
import router from "./router";
import VueGtag from "vue-gtag";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import icons from "./icons";

Vue.prototype.$http = axios;

Vue.prototype.$bucketName = "newspaperumd2019";
Vue.prototype.$bucketUrl = `https://${Vue.prototype.$bucketName}.s3.amazonaws.com/res/`;
Vue.prototype.$getFromBucket = async (fileName) => {
  try {
    const response = await Vue.prototype.$http.get(
      Vue.prototype.$bucketUrl + fileName
    );
    return response;
  } catch (ex) {
    console.log(ex);
    return null;
  }
};

function commonmarkRenderPlaintextRecursive(root) {
  if (root.type === "text") {
    return root.literal;
  }

  let out = [
    "paragraph",
    "block_quote",
    "code_block",
    "heading",
    "softbreak",
    "linebreak",
  ].includes(root.type)
    ? " "
    : "";
  const isList = root.type === "list";

  let node = root.firstChild;
  while (node) {
    if (isList) {
      out += " • ";
    }
    out += commonmarkRenderPlaintextRecursive(node);
    node = node.next;
  }

  return out;
}
Vue.prototype.$commonmarkRenderPlaintext = (source) => {
  const parser = new commonmark.Parser({ smart: true });
  return commonmarkRenderPlaintextRecursive(parser.parse(source)).trim();
};
Vue.prototype.$commonmarkRenderHtml = (source) => {
  const parser = new commonmark.Parser({ smart: true });
  const renderer = new commonmark.HtmlRenderer({ safe: true });
  return renderer.render(parser.parse(source));
};

Vue.prototype.$formatDate = (date) =>
  date.calendar(null, {
    sameDay: "[Today] h:mmA",
    nextDay: "[Tomorrow] h:mmA",
    nextWeek: "[Next] dddd h:mmA",
    lastDay: "[Yesterday] h:mmA",
    lastWeek: "dddd h:mmA",
    sameElse: "M/D/YYYY h:mmA",
  });

Vue.prototype.$ifOnMobile = (yes, no) => {
  if (window.matchMedia("screen and (max-width: 768px)").matches) {
    yes();
  } else {
    no();
  }
};

icons.add();
Vue.component("icon", FontAwesomeIcon);

Vue.config.productionTip = false;
Vue.use(BootstrapVue);

if (process.env.NODE_ENV !== "development") {
  Vue.use(
    VueGtag,
    {
      config: { id: "UA-159331199-1" },
    },
    router
  );
}

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  components: { App },
  template: "<App/>",
});
