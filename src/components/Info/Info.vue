<template>
    <div id="informations">
        <p class="turnMessage">La vie a évolué {{ counter }} fois.</p>
        <p class="aliveMessage">Nombre de cellules en vie : {{ numberOfAliveCells }}</p>
        <p class="errorMessage">{{ errorMessage }}</p>
    </div>
</template>

<script>
  export default {
    name: 'informations',
    props: ['counter', 'numberOfAliveCells', 'errorMessage']
  }
</script>

<style>
    #informations {
        width: 33%;
    }
</style>
