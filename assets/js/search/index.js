import Vue from "vue";
import App from "./App.vue";

export default function({ APPLICATION_ID, API_KEY, INDEX_NAME }) {
  // eslint-disable no-new
  return new Vue({
    el: "#search",
    render: (h) =>
      h(App, {
        props: {
          applicationID: APPLICATION_ID,
          apiKey: API_KEY,
          indexName: INDEX_NAME,
        },
      }),
  });
}
