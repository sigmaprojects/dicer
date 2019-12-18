<template>
  <v-form ref="form" @submit.prevent="submit">

    <v-icon color="red" class="float-right" small v-on:click="deleteCharacter" v-if="this.characterid >= 0">mdi-delete-forever-outline</v-icon>
    <v-text-field v-model="character.name" label="Character Name" :rules="validate_lengths"></v-text-field>

    <h3>Attacks</h3>
    <div
      v-for="(attack, i) in character.attacks"
      v-bind:key="attack.id"
      style="padding-bottom:5px;"
    >
      <v-card class="mx-auto" outlined fluid>
        <v-list-item two-line>
          <v-list-item-content>
            <div class="overline sm-1">
              <v-icon color="red" class="float-left" small v-on:click="deleteAttack(i)">mdi-delete-forever-outline</v-icon>
              <v-icon color="grey" class="float-right" v-if="i > 0" v-on:click="array_move(character.attacks,i,i-1)">mdi-menu-up</v-icon>
              <v-icon color="grey" class="float-right" v-if="i < character.attacks.length-1" v-on:click="array_move(character.attacks,i,i+1)">mdi-menu-down</v-icon>
            </div>

            <v-row no-gutters>
              <v-col>
                <v-text-field
                  dense
                  v-model="attack.name"
                  label="Attack Label"
                  :rules="validate_lengths"
                ></v-text-field>
              </v-col>
              <v-col>
                <v-text-field
                  dense
                  label="Dice (2d8, 1d4, etc)"
                  :value="parseDice(attack.dice)"
                  :rules="validate_dice"
                  v-on:input="updateDice($event,i)"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row no-gutters>
              <v-col>
                <v-text-field
                  v-model="attack.hit"
                  type="number"
                  label="+To hit"
                  
                  :rules="validate_number"
                ></v-text-field>
              </v-col>
              <v-col>
                <v-text-field
                  type="number"
                  v-model="attack.dmg"
                  label="+Dmg"
                  
                  :rules="validate_number"
                ></v-text-field>
              </v-col>
            </v-row>

          </v-list-item-content>
        </v-list-item>

      </v-card>
    </div>

    <!--<button type="submit">Submit</button>-->
    <v-btn small color="primary" class="float-left" v-on:click="addAttack()">+ Add Another Attack</v-btn>
    <v-btn small color="normal" class="float-right" type="button" v-on:click="validate">Save &amp; Finish</v-btn>


    <!--
            <v-btn class="mr-4" @click="submit">submit</v-btn>
            <v-btn @click="clear">clear</v-btn>
    -->

  </v-form>
  
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { Character, Attack } from "../classes";
let isNumber = function(n) {
  return !isNaN(parseFloat(n)) && !isNaN(n - 0);
};

export default {
  name: "EditCharacter",
  props: ['characterid'],
  components: {
    //ValidationProvider,
    //ValidationObserver
  },
  data: () => ({
    character: new Character(),

    validate_lengths: [
      value => !!value || "Required.",
      value => (value || "").length <= 20 || "Max 20 characters"
    ],
    validate_number: [
      value => isNumber(value) || "Required, must be numeric"
    ],
    validate_dice: [
      value => !!value.length || "Required.",
      value => value.replace(/[^0-9d.,\- ]/g, '').length == value.length || "Not valid dice.",
    ]
  }),
  mounted() {
    // eslint-disable-next-line no-console
    
    this.character = this.$CharacterDAO.get(this.characterid);
    /*
    let c = new Character(1, "Deranged Test", [
      new Attack(0, "Mind Blade MH1", 15, [6, 8, 8, 8], 9),
      new Attack(1, "Mind Blade MH2", 10, [6, 8, 8, 8], 9),
      new Attack(2, "Mind Blade OH1", 9, [6, 8, 8, 8], 9),
      new Attack(3, "Mind Blade OH2", 4, [6, 8, 8, 8], 9),
      new Attack(4, "Kings Gythka MH1", 9, [10], 9),
      new Attack(5, "Kings Gythka MH2", 9, [10], 9),
      new Attack(6, "Kings Gythka OH1", 4, [10], 9),
      new Attack(7, "Kings Gythka OH2", 4, [10], 9),
      new Attack(8, "Bite", 7, [4], 2)
    ]);

    this.character = c;
    */
    window.fntest = function() {
      // eslint-disable-next-line no-console
      //return c;
    }
  },
  methods: {
    persistCharacter() {
      //localStorage.characters = this.characters;
      let t = this.$CharacterDAO.save(this.characterid,this.character);
      this.$router.push('/');
      // eslint-disable-next-line no-console
      console.log(t);
    },
    validate() {
      if (this.$refs.form.validate()) {
        this.persistCharacter();
        return false;
      }
    },
    reset() {
      this.$refs.form.reset()
    },
    resetValidation () {
       this.$refs.form.resetValidation()
    },
    parseDice(v) {
      let diceString = '';
      let diceCount = {};
      v.forEach(function(i) { diceCount[i] = (diceCount[i]||0) + 1;});
      Object.entries(diceCount).forEach(([key,value])=>{
        diceString = diceString +  value + 'd' + key + ' ';
      });
      return diceString;
    },
    updateDice(input, id) {
      let diceArray = parseHumanDiceInput(input, id);
      if( !diceArray == false ) {
        // eslint-disable-next-line no-console
        //console.log('success');
        this.character.attacks[id].dice = diceArray;
      }
    },
    array_move(arr, old_index, new_index) {
      if (new_index >= arr.length) {
          var k = new_index - arr.length + 1;
          while (k--) {
              arr.push(undefined);
          }
      }
      arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
      return arr; // for testing
    },
    deleteAttack(i) {
      let attack = this.character.attacks[i];
      if(confirm("Confirm Delete of Attack: " + attack.name)){
        this.character.attacks.splice(i,1);
      }
    },
    deleteCharacter() {
      if(confirm("Confirm Delete The Character: " + this.character.name)){
        let chars = this.$CharacterDAO.list();
        chars.splice(this.characterid,1);
        this.$CharacterDAO.saveAll(chars);
        this.$router.push('/');
      }
    },
    addAttack() {
      this.character.attacks.push( new Attack(this.character.attacks.length) );
    }
  },
  computed: {
  }
};

var parseHumanDiceInput = function(v) {
  let splitt = v.split(/[., +-/_]/);
  let dice = [];
  for (let i = 0; i < splitt.length; i++) {
    var arrayValue = splitt[i];
    // we have to validate the array value by:
    // 1) making sure its not an empty string
    // 2) it includes the letter 'd'
    // 3) it has at least 2 numbers in it
		if( arrayValue.length > 0 && arrayValue.includes('d') && arrayValue.replace(/[^0-9]/g,"").length > 1 ) {
      // now we split the value on d, to get the dice count and which one
      let vA = arrayValue.split('d');
      // more validation
      if( vA[0].replace(/[^0-9]/g,"").length == vA[0].length && vA[1].replace(/[^0-9]/g,"").length == vA[1].length ) {
        // funky es6 stuff, makes this easy
        let d = new Array(parseInt(vA[0])).fill(vA[1]);
        dice.push( ...d );
      } else {
        // eslint-disable-next-line no-console
        //console.log('validation error');
        return false;
      }
		}
  }
  return dice;
}

</script>
