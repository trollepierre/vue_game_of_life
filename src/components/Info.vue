<template>
    <div id="informations">
        <p>La vie a évolué {{ counter }} fois. </p>
        <p>Nombre de cellules en vie : {{ numberOfAliveCells }}</p>
        <p>{{ errorMessage }}</p>
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
