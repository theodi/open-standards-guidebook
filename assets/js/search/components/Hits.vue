<template>
  <div class="ais-Hits-container" v-if="showHits">
    <ais-hits>
      <a slot="item" slot-scope="{ item }" :href="item.url">
        <h3 class="ais-Hits-title">{{ item.title }}</h3>
        <ais-snippet attribute="description" :hit="item" />
      </a>
    </ais-hits>
    <no-results />
    <ais-powered-by />
  </div>
</template>

<script>
import { connectHits } from "instantsearch.js/es/connectors";

import {
  createWidgetMixin,
  AisHits,
  AisPoweredBy,
  AisSnippet,
} from "vue-instantsearch";

import NoResults from "./NoResults";

export default {
  components: {
    AisHits,
    AisPoweredBy,
    AisSnippet,
    NoResults,
  },
  mixins: [createWidgetMixin({ connector: connectHits })],
  computed: {
    showHits() {
      return (
        this.instantSearchInstance.helper &&
        this.instantSearchInstance.helper.state.query &&
        this.instantSearchInstance.helper.state.query.length > 0
      );
    },
  },
};
</script>
