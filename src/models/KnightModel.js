// src/models/Hero.js
export default class KnightModel {
    constructor() {
      this.name = '';
      this.nickname = '';
      this.birthday = '';
      this.weapons = [{
        name: '',
        mod: 0,
        attr: '',
        equipped: true
      }];
      this.attributes = {
        strength: 0,
        dexterity: 0,
        constitution: 0,
        intelligence: 0,
        wisdom: 0,
        charisma: 0
      };
      this.keyAttribute = this.mainAttribute(this.attributes)[0];
    }
  
    addWeapon(weapon) {
      this.weapons.push(weapon);
    }
  
    removeWeapon(index) {
      this.weapons.splice(index, 1);
    }

    mainAttribute(attributes){
      var highestValue = Math.max(...Object.values(attributes));
      return Object.keys(attributes).filter(
        attribute => attributes[attribute] === highestValue
      );
    }
  }
  