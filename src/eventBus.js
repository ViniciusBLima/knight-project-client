import { reactive, readonly } from 'vue';

const state = reactive({
  events: {}
});

function $on(event, callback) {
  if (!state.events[event]) {
    state.events[event] = [];
  }
  state.events[event].push(callback);
}

function $emit(event, ...args) {
  if (state.events[event]) {
    state.events[event].forEach(callback => callback(...args));
  }
}

function $off(event, callback) {
  if (state.events[event]) {
    const index = state.events[event].indexOf(callback);
    if (index > -1) {
      state.events[event].splice(index, 1);
    }
  }
}

export const eventBus = readonly({
  $on,
  $emit,
  $off
});
