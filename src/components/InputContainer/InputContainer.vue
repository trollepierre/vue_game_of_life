<template>
    <div id="inputContainer">
        <p>{{  text  }}
            <input v-model="model" placeholder="placeholder"></p>
    </div>
</template>

<script>
  export default {
    name: 'inputContainer',
    props: ['text', 'model', 'placeholder']
  }
</script>
