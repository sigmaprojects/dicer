<template>
<div>
  <h3>Play</h3>

    <v-text-field v-model="rolleddice" label="Dolled Dice (d20's)" type="number" />
      <v-list two-line>

      </v-list>

</div>
</template>

<script>

// eslint-disable-next-line no-unused-vars
import { Character, Attack } from "../classes";
export default {
  name: "PlayCharacter",
  props: ['characterid'],
  data: () => ({
    character: new Character(),
    rolleddice: ''
  }),
  mounted() {
    this.character = this.$CharacterDAO.get(this.characterid);
  },
  methods: {
    foo() {
      
    }
  },
  
};
</script>
