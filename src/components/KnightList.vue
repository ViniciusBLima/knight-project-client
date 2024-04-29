<template>
  <div>
    <h1>Knights</h1>
    <table v-if="knights.length">
      <thead>
        <tr>
          <th>Name</th>
          <th>Age</th>
          <th>Weapons</th>
          <th>Attributes</th>
          <th>Attack</th>
          <th>Exp</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(knight) in knights" :key="knight.id">
          <td>{{ knight.name }}</td>
          <td>{{ knight.birthday }}</td>
          <td>{{ knight.weapons.length }}</td>
          <td>{{ knight.keyAttribute }}</td>
          <td>{{ calculateAttack(knight) }}</td>
          <td>{{ calculateExp(knight.birthday) }}</td>
          <td>
            <button @click="editKnight(knight)">Edit Nickname</button>
            <button @click="deleteKnight(knight._id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
    <p v-else>No knights</p>
  </div>

  <KnightNicknameEditor :knight="editingKnight" :isVisible="isModalVisible" @close="closeEditor"
    @update:nickname="updateNickname" />

</template>

<script>
import { eventBus } from '@/eventBus';
import KnightNicknameEditor from './KnightNicknameEditor.vue';

export default {
  components: {
    KnightNicknameEditor
  },
  data() {
    return {
      knights: [],
      isLoading: true,
      isEditingKnight: false,
      isModalVisible: false,
      editingKnight: null,
    };
  },
  mounted() {
    this.fetchKnights();
    eventBus.$on('knightAdded', (newKnight) => {
      this.knights.push(newKnight);
      this.isLoading = false;
    });
  },
  beforeUnmount() {
    eventBus.$off('knightAdded');
  },
  methods: {
    fetchKnights() {
      this.isLoading = true;
      fetch('http://localhost:3000/knights')
        .then(response => response.json())
        .then(data => {
          console.log(data);
          this.knights = data;
          this.isLoading = false;
        })
        .catch(error => {
          console.error('Error fetching knights:', error);
          this.isLoading = false;
        });
    },
    calculateAttack(knight) {
      const keyAttrMod = knight.attributes[knight.keyAttribute];
      const equippedWeaponMod = knight.weapons.find(weapon => weapon.equipped).mod;
      return 10 + keyAttrMod + equippedWeaponMod;
    },
    calculateExp(age) {
      return age >= 7 ? Math.floor((age - 7) * Math.pow(22, 1.45)) : 0;
    },
    editKnight(knight) {
      this.editingKnight = { ...knight };
      this.isModalVisible = true;
    },
    closeEditor() {
      this.isModalVisible = false;
      this.editingKnight = null;
    },
    updateNickname(nickname) {
      this.editingKnight.name = nickname;
      console.log(this.editingKnight)
      if (!this.editingKnight || !this.editingKnight._id) {
        console.error('No knight selected for update.');
        return;
      }

      const knightData = {
        name: this.editingKnight.name
      };

      // Atualiza dados do cavaleiro no servidor
      fetch(`http://localhost:3000/knights/${this.editingKnight._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(knightData),
      })
        .then(response => response.json())
        .then(updatedKnight => {
          const index = this.knights.findIndex(k => k._id === updatedKnight._id);
          if (index !== -1) {
            this.knights[index] = updatedKnight;
          }

          this.isModalVisible = false;
          this.editingKnight = null;
        })
        .catch(error => {
          console.error('Error updating knight:', error);
        });
      this.closeEditor();

    },

    deleteKnight(knightId) {
      const confirmed = confirm('Are you sure you want to delete this knight?');
      if (confirmed) {
        fetch(`http://localhost:3000/knights/${knightId}`, {
          method: 'DELETE',
        })
          .then(() => {
            this.knights = this.knights.filter(k => k.id !== knightId);
            eventBus.$emit('heroAdded'); 
            this.fetchKnights();
          })
          .catch(error => {
            console.error('Error deleting knight:', error);
          });
      }
    },
  },
};
</script>

<style scoped>
</style>
