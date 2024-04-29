<template>
  <div class="app">
    <div class="lists">
      <knight-list></knight-list>
      <hero-list></hero-list>
    </div>
    <div class="knight-form-holder">
      <knight-form></knight-form>
    </div>
  </div>
</template>

<script>
import KnightList from './components/KnightList.vue';
import KnightForm from './components/KnightForm.vue';
import HeroList from './components/HeroList.vue';

export default {
  name: 'App',
  components: {
    KnightList,
    KnightForm,
    HeroList
  },
  mounted() {
    document.title = 'Knight Project';
  }
};
</script>

<style>
body {
  font-family: Arial, sans-serif;
  background-color: #f4f4f4;
  margin: 0;
  padding: 20px;
  color: #333;
}

h1, h2 {
  color: #333;
}

.form-group, .table-container {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

input[type="text"], input[type="number"], select {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  margin-bottom: 16px; 
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

button {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  margin-top: 10px;
}

button:hover {
  background-color: #45a049;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  background-color: #f9f9f9;
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 10px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px; 
}

th, td {
  text-align: left;
  padding: 8px;
  border: 1px solid #ddd;
}

th {
  background-color: #666;
  color: white;
}

tr:nth-child(even) {
  background-color: #f2f2f2;
}

tr:hover {
  background-color: #ddd;
}

.lists {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: flex-start;
}

.knight-form-holder {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>
