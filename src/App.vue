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
      <v-container fluid >

        
        <a class="sempai" v-if="load" id="sempai">
           <img src="./assets/grate-artiste.png" />
        </a>
        
        <router-view></router-view>

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

<style lang="scss">
@-webkit-keyframes move {
    from { left: 0; }
    to { left: 50%; }
}
@keyframes move {
    from { left: 0; }
    to { left: 50%; }
}

a.sempai {
    text-decoration: none;
    padding-right: 20px;
    left: 50%;
    position: absolute;
    -webkit-animation: move 5s;
    animation: move 5s;
    z-index: 999;
}

a.sempai img {
    -webkit-transition: all 1s ease-in-out;
    -moz-transition: all 1s ease-in-out; 
    -o-transition: all 1s ease-in-out; 
    -ms-transition: all 1s ease-in-out; 
    border-radius:60px;
    transition-duration: 1s;
    }

a.sempai img:hover { 
    box-shadow: 0 3px 15px #000;
    -webkit-transform: rotate(360deg); 
    -moz-transform: rotate(360deg); 
    -o-transform: rotate(360deg);
    -ms-transform: rotate(360deg); 
    transform: translate()
}
.m-fadeOut {
  visibility: hidden;
  opacity: 0;
  transition: visibility 0s linear 300ms, opacity 300ms;
}
</style>

<script>

//import HelloWorld from './components/HelloWorld';
//import CharactersList from './components/CharactersList';
import Konami from './konami.js';

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
    load: false
  }),

  mounted() {
    // eslint-disable-next-line no-console
    //console.log(this.$refs.sempai[0]);
    /*
    Contra.addHandler(function() {
      this.load = true;
      setTimeout(() => this.load = false, 150); 
    });
    */

   /*
   new Konami(function() {
     // eslint-disable-next-line no-console
     console.log('doin it: ' + this.load);
     this.load = true;
     setTimeout(() => this.load = false, 150); 
   });
  */
   new Konami(() => this.showAndHideKisaArt() ); 
  },

  beforeCreate: function() {
    // eslint-disable-next-line no-console
  },

  methods: {
    showAndHideKisaArt() {
      this.load = true;
      setTimeout(() => document.getElementById("sempai").classList.toggle("m-fadeOut"), 2000); 
      setTimeout(() => this.load = false, 2300); 
    }
  },
  
};
</script>
