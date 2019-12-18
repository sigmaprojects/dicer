import {Character} from './classes';

export class CharacterDAO {
   
    constructor() {
        this.charactersKey = 'characters';
    }
    
    list() {
        let arr = JSON.parse(localStorage.getItem(this.charactersKey))
        if( !Array.isArray(arr) ) {
            arr = []
        }
        for (let i = 0; i < arr.length; i++) {
            arr[i] = Character.fromJSON(arr[i]);
        }
        return arr
    }

    get(id) {
        // we don't really manage IDs, they're just index positions
        // if ID is a -1 that means its new (if we get sent a 0 its real because 0 index postions exists) 
        let characters = this.list();
        if( id < 0 ) {
            return new Character( characters.length );
        }
        return characters[id];
    }

    saveAll(characters) {
        // this used to do double checks on ids, but its not nessicary - just overwrite everything
        if( Array.isArray(characters) ) {
            for (let i = 0; i < characters.length; i++) {
                characters[i].id = i;
                for (let x = 0; x < characters[i].attacks.length; x++) {
                    characters[i].attacks[x].id = x;
                }
            }
            localStorage.setItem(this.charactersKey,JSON.stringify(characters))
        }
        return new Array();
    }
    save(id,character) {
        let chars = this.list();
        if( id < 0 ) {
            // lt 0 probably means -1, meaning new character
            chars[ chars.length ] = character;
        } else {
            // existing character, just replace the index and save
            chars[id] = character;
        }
        this.saveAll(chars);
    }
    sanitizee() {
        return false
    }
    isNumber(n) {
        return !isNaN(parseFloat(n)) && !isNaN(n - 0);
    }
}