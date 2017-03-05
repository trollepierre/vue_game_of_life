<template>
    <div id="bouton" class="button">
        <button :class="className" v-on:click="onClick">{{ text }}</button>
    </div>
</template>

<script>
  export default {
    name: 'bouton',
    props: ['className', 'onClick', 'text']
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