<template>
  <div class="create-knight">
    <h1>Create Knight</h1>
    <form @submit.prevent="submitKnight" class="knight-form">
      <div class="form-group">
        <label for="name">Name:</label>
        <input type="text" id="name" v-model="knight.name" required />
      </div>
      <div class="form-group">
        <label for="nickname">Nickname:</label>
        <input type="text" id="nickname" v-model="knight.nickname" />
      </div>
      <div class="form-group">
        <label for="birthday">Age:</label>
        <input type="number" min="0" id="birthday" v-model="knight.birthday" />
      </div>
      <div class="form-group">
        <h2>Weapons</h2>
        <ul>
          <li v-for="(weapon, index) in knight.weapons" :key="index" class="weapon-item">
            <label>Name:</label>
            <input type="text" v-model="weapon.name" required />
            <label>Mod:</label>
            <input type="number" v-model="weapon.mod" required />
            <label>Attr:</label>
            <select v-model="weapon.attr" required>
              <option value="strength">Strength</option>
              <option value="dexterity">Dexterity</option>
              <option value="constitution">Constitution</option>
              <option value="intelligence">Intelligence</option>
              <option value="wisdom">Wisdom</option>
              <option value="charisma">Charisma</option>
            </select>
            <label>Equipped:</label>
            <input type="checkbox" :id="'weapon-checkbox-' + index" v-model="weapon.isEquipped"
              @change="unequipAllExcept(index)" />
            <button type="button" @click="knight.removeWeapon(index)">Remove</button>
          </li>
        </ul>
        <button type="button" @click="addWeapon">Add Weapon</button>
      </div>
      <div class="form-group">
        <h2>Attributes</h2>
        <div v-for="(value, attribute) in knight.attributes" :key="attribute" class="attribute-item">
          <label>{{ attribute }}:</label>
          <input type="number" min="0" v-model="knight.attributes[attribute]" />
        </div>
      </div>
      <div class="form-group">
        <label for="keyAttribute">Key Attribute: {{ knight.keyAttribute }}</label>
      </div>
      <button type="submit">Create Knight</button>
    </form>
  </div>
</template>

<script>
import KnightModel from '@/models/KnightModel'
import { eventBus } from '@/eventBus';


export default {
  data() {
    return {
      knight: new KnightModel(),
    };
  },
  watch: {
    'knight.attributes': {
      handler(newAttributes) {
        this.knight.keyAttribute = this.knight.mainAttribute(newAttributes)[0];
      },
      deep: true,
    },
  },
  methods: {
    submitKnight() {
      fetch('http://localhost:3000/knights', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.knight),
      })
        .then(response => response.json())
        .then(data => {
          eventBus.$emit('knightAdded', data); 
          console.log('Knight created:', data);
        })
        .catch(error => {
          console.error('Error creating knight:', error);
        });
    },
    addWeapon() {
      this.knight.weapons.push({
        name: '',
        mod: 0,
        attr: 'strength',
        equipped: true,
      });
    },
    unequipAllExcept(weaponIndex) {
      const weapons = this.knight.weapons;

      weapons.forEach((weapon, index) => {
        weapon.isEquipped = index === weaponIndex;
      });
    },
  },
};
</script>

<style scoped>
</style>
