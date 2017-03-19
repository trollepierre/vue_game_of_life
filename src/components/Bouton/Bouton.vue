<template>
    <div class="button">
        <button :class="className" v-on:click="buttonClick">{{ text }}</button>
    </div>
</template>

<script>
  export default {
    name: 'bouton',
    props: ['className', 'text'],
    methods: {
      buttonClick: function () {
        this.$emit('click')
      }
    }
  }
</script>

<style>
    button {
        width: 300px;
        height: 30px;
        text-align: center;
        margin: 8px;
        font-size: large;
    }
</style>