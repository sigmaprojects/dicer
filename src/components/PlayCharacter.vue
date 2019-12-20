<template>
  <div>

    <!--
    <div class="float-left">
      <v-btn small :to="{ name: 'playcharacter', params: { characterid: character.id }}">Reset</v-btn>
    </div>
    <div class="float-right">
      <v-btn small :to="{ name: 'playcharacter', params: { characterid: character.id }}">Reset</v-btn>
    </div>
    -->

    <v-container fluid class="pt-0 pb-0">
      <v-row no-gutters>
        <v-col cols="6">
          <v-btn small v-on:click="refreshsheet">Refresh Sheet</v-btn>
        </v-col>
      </v-row>
    </v-container>
    

    <v-text-field
      v-model="rolleddice"
      label="Dolled Dice (d20's)"
      v-on:keypress="isDiceRoll($event)"
      v-on:input="updateRolls($event)"
    />

    <v-container fluid>
      <v-row no-gutters>
        <!--v-for="n in this.character.attacks.length"-->
        <v-col
          v-for="(attack) in this.character.attacks"
          v-bind:key="attack.id"
          cols="12"
          sm="12"
          md="6"
          lg="6"
          v-on:click="selectAttack($event)"
          class="attack-container"
        >
          <v-card class="pa-2" outlined tile>
            <v-row no-gutters align="center" justify="center">
              <template>
                <v-col>
                  <div class="overline mb-1">{{attack.name}}</div>
                  <v-list-item-subtitle>
                    {{ character.getHumanReadableDiceForAttack(attack.id) }}
                    +<span class="deep-orange--text">{{attack.hit}} Hit</span>
                    +<span class="orange--text">{{attack.dmg}} Dmg</span>
                  </v-list-item-subtitle>
                </v-col>
              </template>
              <template align-center>
                <v-col>
                  <span class="headline red--text" ref="tohit"></span>
                  <v-checkbox
                    label="Hit"
                    hide-details
                    :value="attack.id"
                    :id="'checkbox'+attack.id"
                    class="shrink mr-2 mt-0 mb-0 ml-0 float-right hashit"
                  ></v-checkbox>
                </v-col>
              </template>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>


    <v-container fluid>
      <v-row no-gutters>
         <v-col v-for="(diceType) in this.diceTypes" v-bind:key="diceType.name">

          <v-badge top right overlap="overlap" class="align-self-center" color="error" >
            <template v-slot:badge>
              <!--<span :ref="'dice'+diceType.value">0</span>-->
              <span v-if="hits[diceType.value] > 0">{{ hits[diceType.value] }}</span>
            </template>
            <v-icon size="xxx-large">{{diceType.icon}}</v-icon>
          </v-badge>
          
         </v-col>
      </v-row>
      <div class="text-center mt-1">
        <v-sheet v-if="hitdice.length > 0 || totalDmg.length > 0">
          <span class="mr-2 text--red" style="word-spacing: 20px;">{{hitdice}}</span> <span class="ml-2">{{totalDmg}}</span>
        </v-sheet>
      </div>
      <!--
      <v-row no-gutters>
        Result: <span ref="rolleddicecontainer">asd</span> <span ref="dmgcontainer">sdfd</span>
      </v-row>
      -->
    </v-container>

  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { Character, Attack } from "../classes";
export default {
  name: "PlayCharacter",
  props: ["characterid"],
  data: () => ({
    character: new Character(),
    rolleddice: '',
    hitdice: '',
    totalDmg: '',
    diceTypes: [
      {name: 'd4', value: 4, icon: 'mdi-dice-d4-outline'},
      {name: 'd6', value: 6, icon: 'mdi-dice-d6-outline'},
      {name: 'd8', value: 8, icon: 'mdi-dice-d8-outline'},
      {name: 'd10', value: 10, icon: 'mdi-dice-d10-outline'},
      {name: 'd12', value: 12, icon: 'mdi-dice-d12-outline'},
      {name: 'd20', value: 20, icon: 'mdi-dice-d20-outline'},
    ],
    hits: getBlankHits()
  }),
  mounted() {
    this.character = this.$CharacterDAO.get(this.characterid);

    // eslint-disable-next-line no-console
    //console.log( this.$refs.tohit[0] );
  },
  methods: {
    refreshsheet() {
      this.character = this.$CharacterDAO.get(this.characterid);
      this.rolleddice = '';
      this.hitdice = '';
      this.totalDmg = '';
      this.diceTypes = [
        {name: 'd4', value: 4, icon: 'mdi-dice-d4-outline'},
        {name: 'd6', value: 6, icon: 'mdi-dice-d6-outline'},
        {name: 'd8', value: 8, icon: 'mdi-dice-d8-outline'},
        {name: 'd10', value: 10, icon: 'mdi-dice-d10-outline'},
        {name: 'd12', value: 12, icon: 'mdi-dice-d12-outline'},
        {name: 'd20', value: 20, icon: 'mdi-dice-d20-outline'},
      ];
      this.hits = getBlankHits()
      for(let i = 0; i < this.character.attacks.length; i++) {
        this.$refs.tohit[i].textContent = '';
      }
      let elms = this.$el.querySelectorAll("input[id^='checkbox'][checked=true], input[id^='checkbox']:checked");
      for(let i = 0; i < elms.length; i++) {
        elms[i].checked = false;
        elms[i].dispatchEvent( new Event('change') );
      }
    },

    isDiceRoll(evt) {
      // only allow specific characters into this field, namely numbers and seperators
      // eslint-disable-next-line no-console
      //console.log(evt.keyCode)
      evt = evt ? evt : window.event;
      let charCode = evt.which ? evt.which : evt.keyCode;
      if (
        charCode > 31 &&
        (charCode < 48 || charCode > 57) &&
        charCode !== 46 &&
        charCode !== 32 &&
        charCode !== 45 &&
        charCode !== 44
      ) {
        evt.preventDefault();
      } else {
        return true;
      }
    },

    updateRolls(value) {
      let split = value.split(/[., +-/_]/);
      if( split[split.length-1].length > 0 ) {
        for (let i = 0; i < split.length; i++) {
          let arrayValue = split[i];
          if( arrayValue.length > 0 ) {
            //console.log(arrayValue);
            // dont bother continuing if there's more dice than attacks
            if( i < this.character.attacks.length ) {
              this.updateToHit( arrayValue, i );
            }
          }
        }
      }
    },

    updateToHit(rolled, skillIndex) {
      let skill = this.character.attacks[skillIndex];
      this.$refs.tohit[skillIndex].textContent = +skill.hit + +rolled;
      //$("span[name='"+skillIndex+"'].tohit").text( +skill.hit + +rolled );
    },


    selectAttack(evt) {
      //try to find if the user clicked on the checkbox/input
      let foundInput = evt.target.closest('div.v-input');
      // if no input, then continue
      if( !foundInput ) {
        let elm = evt.target.closest('.attack-container').querySelector('input[type="checkbox"]');
        if( elm.checked ) {
          elm.checked = false;
        } else {
          elm.checked = true;
        }
        // need to force trigger this for the vuetify UI to update
        elm.dispatchEvent( new Event('change') )
      }
      this.updateResults()
    },

    updateResults() {
      // gather up all the checked checkboxes
      // each ones value is the index position of the characters attack array
      // note: do Not use :checked selector, it doesn't work right
      let elems = document.querySelectorAll("input[id^='checkbox'][checked=true], input[id^='checkbox']:checked");
      let checkedVals = Array.prototype.map.call(elems, function(obj) {
        return obj.value;
      });

      let totalBonusDmg = 0;

      // skillDice is an array of ALL the dmg dice needed to be rolled
      let skillDice = [];
      for (let i = 0; i < checkedVals.length; i++) {
        let skillIndex = checkedVals[i];
        skillDice = skillDice.concat( this.character.attacks[skillIndex].dice );
        totalBonusDmg = totalBonusDmg + +this.character.attacks[skillIndex].dmg;
      }

      // now that we have 1 long array with all the dice we have to roll
      // write it out so its easier to roll
      // start by creating an object that has counted the dice
      var diceCount = {};
      skillDice.forEach(function(i) { diceCount[i] = (diceCount[i]||0) + 1;});

      // eslint-disable-next-line no-console
      //console.log('totalBonusDmg: ' + totalBonusDmg)

      // reset the basics
      this.hits = getBlankHits();
      this.hitdice = '';
      this.totalDmg = '';

      Object.entries(diceCount).forEach(([key,value])=>{
        //$('#results-container').append( value + 'd' + key + ' &nbsp; &nbsp; ');
        this.hitdice = this.hitdice + ' ' + value + 'd' + key + '  ';
        this.hits[key] = value;
      });
      this.totalDmg = '+' + totalBonusDmg + ' Damage';
      // eslint-disable-next-line no-console
      console.log(this.hitdice);
    }
  },
  computed: {
    
  }
};
function getBlankHits() {
  return {
      4:0,6:0,8:0,10:0,12:0,20:0
    };
}
</script>
