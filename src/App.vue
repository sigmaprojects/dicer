<template>
  <v-app id="app">
    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <DrawerContents />
    </v-navigation-drawer>

    <v-app-bar
      app
      color="indigo"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <!--<v-toolbar-title>Dicer </v-toolbar-title>-->
      <v-toolbar-title>Dicer</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <!--class="fill-height"-->
      <v-container
        
        fluid
      >

        <!-- <CharactersList /> -->
        <router-view>

        </router-view>

      </v-container>
    </v-content>
    <v-footer
      color="indigo"
      app
    >
      <span class="white--text">&copy; 2019</span>
    </v-footer>
  </v-app>
</template>


<script>

//import HelloWorld from './components/HelloWorld';
//import CharactersList from './components/CharactersList';

export default {
  name: 'App',

  components: {
    //HelloWorld,
    //CharactersList,
  },

  props: {
    source: String,
  },

  data: () => ({
    drawer: null,
  }),

  mounted() {
    // eslint-disable-next-line no-console
    //console.log(this.$ToolbarTitle);
  },

  beforeCreate: function() {
    // eslint-disable-next-line no-console
  },

  methods: {
  },
  
};
</script>
