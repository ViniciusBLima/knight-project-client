<template>
  <div>
    <h1>Heros</h1>
    <table v-if="heros.length">
      <thead>
        <tr>
          <th>Name</th>
          <th>Age</th>
          <th>Weapons</th>
          <th>Attributes</th>
          <th>Attack</th>
          <th>Exp</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(hero, index) in heros" :key="index">
          <td>{{ hero.name }}</td>
          <td>{{ hero.birthday }}</td>
          <td>{{ hero.weapons.length }}</td>
          <td>{{ hero.keyAttribute }}</td>
          <td>{{ calculateAttack(hero) }}</td>
          <td>{{ calculateExp(hero.birthday) }}</td>
        </tr>
      </tbody>
    </table>
    <p v-else>No heros</p>
  </div>
</template>

<script>
import { eventBus } from '@/eventBus';

export default {
  data() {
    return {
      heros: [], 
      isLoading: true, 
    };
  },
  mounted() {
  this.fetchHeros();
  eventBus.$on('heroAdded', () => {
    this.fetchHeros()
  });
},
beforeUnmount() {
  eventBus.$off('HeroAdded'); 
},
  methods: {
    fetchHeros() {
      this.isLoading = true; 
      fetch('http://localhost:3000/knights?filter=heroes') 
        .then(response => response.json())
        .then(data => {
          console.log(data);
          this.heros = data;
          this.isLoading = false; 
        })
        .catch(error => {
          console.error('Error fetching heros:', error);
          this.isLoading = false; 
        });
    },
    calculateAttack(hero) {
      const keyAttrMod = hero.attributes[hero.keyAttribute];
      const equippedWeaponMod = hero.weapons.find(weapon => weapon.equipped).mod;
      return 10 + keyAttrMod + equippedWeaponMod;
    },
    calculateExp(age) {
      return age >= 7 ? Math.floor((age - 7) * Math.pow(22, 1.45)) : 0;
    },
  },
};
</script>

<style scoped>
</style>
