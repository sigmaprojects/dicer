<template>
  <div>
      <v-list two-line>

        <v-subheader>My Characters</v-subheader>
      <div v-for="(character) in this.characters" v-bind:key="character.id">
        <v-divider />
        <v-list-item :to="{ name: 'playcharacter', params: { characterid: character.id }}">
        
          <v-avatar color="indigo">
            <span class="white--text headline">{{ character.name.substring(0,2).toUpperCase() }}</span>
          </v-avatar>
          <v-list-item-content class="pa-md-4">
            <v-list-item-title>{{character.name}}</v-list-item-title>
            <v-list-item-subtitle>{{character.attacks.length}} Attacks / {{character.getDiceCount()}} Dmg Dice</v-list-item-subtitle>
          </v-list-item-content>
          
          <v-btn small color="warning" class="float-right" :to="{ name: 'editcharacter', params: { characterid: character.id }}">Edit</v-btn>

        </v-list-item>
      </div>

        <v-divider />

        <v-list-item link to="/editcharacter/-1">
          <v-avatar color="indigo">
            <span class="white--text headline">??</span>
          </v-avatar>
          <v-list-item-content class="pa-md-4">
            <v-list-item-title>New Character</v-list-item-title>
            <v-list-item-subtitle>Create a new character to manage</v-list-item-subtitle>
          </v-list-item-content>
          <v-btn small color="warning" class="float-right" to="/editcharacter/-1">Create</v-btn>
        </v-list-item>
      </v-list>

      <v-expansion-panels accordion class="mt-4">
        <v-expansion-panel>
          <v-expansion-panel-header>About</v-expansion-panel-header>
          <v-expansion-panel-content>
            <div class="body-2">
            This D&amp;D tool: <br />
            1) Adds up all your attack To Hits. <br />
            2) Lets you check-off which attacks hit. <br />
            3) Counts which Damage Dice need to be rolled. <br />
            4) Sums up all the base damage. <br />
            Create a character, then when you're playing simply copy all your rolled d20 results here, the tool will do the rest. <br />
            </div>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
  </div>
</template>

<script>
//import { Character, Attack } from '../classes';

export default {
  name: "CharactersList",
  data: () => ({
    characters: [],
  }),
  mounted() {
    /*
    let c = new Character(
      0,
      'Deranged Test',
      [
        new Attack(0,'Mind Blade MH1',15,[6,8,8,8],9),
        new Attack(1,'Mind Blade MH2',10,[6,8,8,8],9),
        new Attack(2,'Mind Blade OH1',9,[6,8,8,8],9),
        new Attack(3,'Mind Blade OH2',4,[6,8,8,8],9),
        new Attack(4,'Kings Gythka MH1',9,[10],9),
        new Attack(5,'Kings Gythka MH2',9,[10],9),
        new Attack(6,'Kings Gythka OH1',4,[10],9),
        new Attack(7,'Kings Gythka OH2',4,[10],9),
        new Attack(8,'Bite',7,[4],2),
      ]
    );
    this.characters.push(c);
    */
    this.characters = this.$CharacterDAO.list();
    // eslint-disable-next-line no-console
    //console.log( this.characters[0] );
  },
  methods: {
    persistCharacters() {
      //localStorage.characters = this.characters;
    }
  },
  
};
</script>
