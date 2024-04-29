<template>
    <div v-if="isVisible" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <div class="modal-holder">
          <h2>Edit Knight nickname</h2>
          <input v-model="nickname" placeholder="Digite o novo apelido">
          <button @click="save">Save</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      knight: Object,
      isVisible: Boolean,
    },
    data() {
      return {
        nickname: '',
      };
    },
    watch: {
      knight: {
        handler(newVal) {
          this.nickname = newVal ? newVal.name : '';
        },
        immediate: true
      }
    },
    methods: {
      save() {
        this.$emit('update:nickname', this.nickname);
        this.closeModal();
      },
      closeModal() {
        this.$emit('close');
      }
    }
  }
  </script>
  
  <style scoped>
  .modal {
    display: block; 
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgb(0,0,0);
    background-color: rgba(0,0,0,0.4);
  }
  .modal-content {
    background-color: #fefefe;
    margin: 15% auto;
    padding: 20px;
    border: 1px solid #888;
    width: 30%;
  }
  .close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
  }
  .close:hover,
  .close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
  }
  .modal-holder{
    display: flex;
    flex-direction: column;
  }
  </style>
  