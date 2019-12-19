<template>
<v-list dense>
        <v-list-item link to="/">
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Characters</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <a href="https://github.com/sigmaprojects/dicer/" style="text-decoration:none;" target="_blank">
        <v-list-item>
          <v-list-item-action>
            <v-icon>mdi-contact-mail</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Contact / Issues</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        </a>
        <v-list-item v-on:click="resetall">
          <v-list-item-action>
            <v-icon>mdi-delete</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Reset All</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>    
</template>

<script>
export default {
  name: "DrawerContents",
  components: {
  },
  data: () => ({
    
  }),
  mounted() {
  },
  methods: {
    resetall() {
      if(confirm( 'This will delete all saved characters and attacks, are you sure you want to continue? ')){
        this.$CharacterDAO.saveAll([]);
        // c
        this.$router.push('/');
      }
    }
  }
};
</script>