<template>
  <ais-instant-search :search-client="searchClient" :index-name="indexName">
    <ais-configure
      :hits-per-page.camel="10"
      :attributes-to-snippet.camel="['description']"
    />
    <ais-search-box placeholder="Search this site" />

    <hits />
  </ais-instant-search>
</template>

<script>
import algoliasearch from "algoliasearch/lite";

import {
  AisConfigure,
  AisInstantSearch,
  AisSearchBox,
} from "vue-instantsearch";

import Hits from "./components/Hits";

export default {
  components: {
    AisConfigure,
    Hits,
    AisInstantSearch,
    AisSearchBox,
  },
  props: {
    applicationID: {
      required: true,
      type: String,
    },
    apiKey: {
      required: true,
      type: String,
    },
    indexName: {
      required: true,
      type: String,
    },
  },
  data() {
    return {
      searchClient: algoliasearch(this.applicationID, this.apiKey),
    };
  },
};
</script>
