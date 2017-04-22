<template>
    <div class="inputContainer">
        <p>{{ text }} de la nouvelle grille à créer :
            <input ref="input"
                   v-bind:value="model"
                   v-on:input="updateValue($event.target.value)"
                   :placeholder="placeholder">
        </p>
    </div>
</template>

<script>
  export default {
    name: 'inputContainer',
    props: ['text', 'placeholder'],
    methods: {
      updateValue: function (value) {
        let formattedValue = value.trim()
        if (!isNaN(Number(formattedValue))) {
          if (formattedValue !== value) {
            this.$refs.input.value = formattedValue
          }
          this.$emit('input', Number(formattedValue))
        }
      }
    }
  }
</script>