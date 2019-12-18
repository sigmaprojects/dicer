import Vue from 'vue'

import VueRouter from 'vue-router'
Vue.use(VueRouter)

import App from './App.vue'
import vuetify from './plugins/vuetify';
import CharactersList from './components/CharactersList';
Vue.component('CharactersList', CharactersList);

import EditCharacter from './components/EditCharacter';
Vue.component('EditCharacter', EditCharacter);

import DrawerContents from './components/DrawerContents';
Vue.component('DrawerContents', DrawerContents);

import PlayCharacter from './components/PlayCharacter';
Vue.component('PlayCharacter', PlayCharacter);

Vue.config.productionTip = false

import {CharacterDAO} from './CharacterDAO';
Vue.prototype.$CharacterDAO = new CharacterDAO();


const routes = [
  { path: '/play/:characterid', component: PlayCharacter, props: true, name: 'playcharacter'  },
  { path: '/editcharacter/:characterid', component: EditCharacter, props: true, name: 'editcharacter' },
  { path: '/', component: CharactersList }
]
const router = new VueRouter({
  routes // short for `routes: routes`
})
// eslint-disable-next-line no-console

const app = new Vue({
  router,
  vuetify: vuetify,
  render: h => h(App)
}).$mount('#app')
app;