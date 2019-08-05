<template>
  <div v-if="hasNoResults">
    No results found
  </div>
</template>

<script>
import { connectHits } from "instantsearch.js/es/connectors";
import { createWidgetMixin } from "vue-instantsearch";

export default {
  name: "NoResults",
  mixins: [createWidgetMixin({ connector: connectHits })],
  computed: {
    hasNoResults() {
      return (
        this.state && this.state.results && this.state.results.nbHits === 0
      );
    },
  },
};
</script>
