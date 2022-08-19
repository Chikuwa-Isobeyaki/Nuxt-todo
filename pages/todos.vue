<template>
  <div>
    <!-- {{ todos }} -->
    <ul>
      <li v-for="todo in todos" :key="todo.id">
        {{ todo.done }} {{ todo.name }}  {{ todo.created }}
      </li>
      </ul>
    <form v-on:submit.prevent='add'>
      <input v-model = name>
      <button>Add</button>
    </form>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      name: '',
      done: false
    }
  },
  created: function() {
    this.$store.dispatch('todos/init')
  },
  methods: {
    add() {
      this.$store.dispatch('todos/add', this.name)
      this.name = ''
    }
  },
  computed: {
    todos() {
      return this.$store.state.todos.todos
    }
  }
}
</script>

