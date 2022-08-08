<template>
  <template v-if="isLoading">
    <h3>Fetching boutiques...</h3>
  </template>

  <template v-else-if="!hasPermission">
    <h3>Can't access your location, so can't display closest boutiques</h3>
  </template>

  <boutique-list v-else :boutiques="closestBoutiques" />
</template>

<script lang="ts">
import { defineComponent } from "vue";

import BoutiqueList from "./components/BoutiqueList.vue";
import { getBoutiques } from "./services/botique";
import geo from "./services/geo";
import { Boutique, ClosestBoutique } from "./typings/boutique";

const NUM_CLOSEST_BOUTIQUES = 5;

export default defineComponent({
  name: "App",
  data() {
    // alternatively, list of boutiques could be in a store
    // but for this exercise a store didn't seem necessary
    return {
      boutiques: [] as Boutique[],
      isLoading: true,
      closestBoutiques: [] as Boutique[],
      hasPermission: true,
    };
  },
  components: { BoutiqueList },
  async mounted() {
    try {
      // checks for permissions. If none are given, stop right here
      await geo.getPosition();
    } catch (err) {
      alert("Couldn't get location. Make sure you've allowed access ");
      this.hasPermission = false;
      this.isLoading = false;
      return;
    }

    await this.getBoutiques();

    this.trackPosition();

    this.isLoading = false;
  },
  methods: {
    async getBoutiques() {
      try {
        // todo: update axios typing to take into account interceptor changes
        this.boutiques = (await getBoutiques()) as any;
      } catch (err) {
        alert("Something went wrong fetching boutiques");
      }
    },
    getClosestBoutiques({ coords }: GeolocationPosition) {
      const mappedBoutques = this.boutiques
        .map((b: Boutique) => {
          return {
            closeness: this.calcCloseness(b.location.lat, b.location.lon),
            boutique: b,
          };
        })
        .sort((a: ClosestBoutique, b: ClosestBoutique) => {
          return a.closeness - b.closeness;
        });

      const currPos = this.calcCloseness(coords.latitude, coords.longitude);
      let result: ClosestBoutique[] = [];
      let idx = 0;
      let b: ClosestBoutique;

      for (b of mappedBoutques) {
        // because they're sorted by lowest closeness, as
        // soon as we find one that is lower than current position
        // we can just get the the {NUM_CLOSEST_BOUTIQUES} items at once
        // instead of looping an additional {NUM_CLOSEST_BOUTIQUES} times
        if (b.closeness < currPos) {
          result = mappedBoutques.slice(idx, NUM_CLOSEST_BOUTIQUES);
          break;
        }

        idx++;
      }

      this.closestBoutiques = result.map(({ boutique }) => boutique);
    },
    async trackPosition() {
      try {
        this.getClosestBoutiques(await geo.watchPosition());
      } catch (err) {
        alert("Couldn't get location. Make sure you've allowed access ");
      }
    },
    calcCloseness(x: number, y: number) {
      return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
    },
  },
});
</script>

<style>
html,
body {
  padding: 0;
  margin: 0;
}

#app {
  text-align: center;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  padding: 0;
  margin: 0;
}

h1 {
  margin-top: 0;
  padding-top: 0.67em;
}
</style>
