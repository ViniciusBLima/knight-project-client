// src/models/Hero.js
export default class HeroModel {
    constructor() {
      this.name = '';
      this.nickname = '';
      this.birthday = '';
      this.weapons = [{
        name: 'sword',
        mod: 3,
        attr: 'strength',
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
      this.keyAttribute = 'strength';
    }
  
    addWeapon(weapon) {
      this.weapons.push(weapon);
    }
  
    removeWeapon(index) {
      this.weapons.splice(index, 1);
    }
  }
  