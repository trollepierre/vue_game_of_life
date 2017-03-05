<template>
    <div id="bouton" class="button">
        <button :class="className" v-on:click="click">{{ text }}</button>
    </div>
</template>

<script>
  export default {
    name: 'bouton',
    props: ['className', 'text'],
    methods: {
      click: function () {
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