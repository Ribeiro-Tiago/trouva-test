<template>
  <li>
    <div>
      <h4>{{ boutique.name }}</h4>
      <img
        :src="logo"
        :alt="boutique.name"
        onerror="this.src='/assets/imgs/placeholder.png'"
      />
    </div>

    <p>{{ boutique.description }}</p>

    <small v-if="boutique.founder_quote">
      <!-- 
        some parsing should be done to remove quote unicode, \n, etc 
        that might exist in some of the founder quotes
       -->
      {{ this.boutique.founder_quote }}
    </small>
  </li>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

import { Boutique } from "../typings/boutique";

export default defineComponent({
  name: "boutique-list",
  props: {
    boutique: Object as PropType<Boutique>,
  },
  computed: {
    logo() {
      return this.boutique?.logo?.url ?? "assets/placeholder.png";
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
li {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  padding: 2px 16px;
  transition: 0.3s;
  width: 60%;
  background: #f7f7f7;
  margin: auto;
  margin-bottom: 20px;
}

li:last-child {
  margin-bottom: 0;
}

li:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}

img {
  max-width: 200px;
}

small {
  font-style: italic;
}
</style>
