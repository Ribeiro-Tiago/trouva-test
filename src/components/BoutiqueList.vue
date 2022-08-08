<template>
  <div class="boutique-list">
    <h1>Boutiques</h1>
    <h3>These are the 5 closest boutiques</h3>

    <ul>
      <boutique-item v-for="(b, idx) in boutiques" :key="idx" :boutique="b" />
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

import { Boutique } from "../typings/boutique";
import BoutiqueItem from "./BoutiqueItem.vue";

export default defineComponent({
  name: "boutique-list",
  props: {
    boutiques: Array as PropType<Boutique[]>,
  },
  components: { BoutiqueItem },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.boutique-list {
  background: #eaeaea;
}

ul {
  list-style-type: none;
  padding: 0;
  padding-bottom: 20px;
  margin: 0;
}
</style>
