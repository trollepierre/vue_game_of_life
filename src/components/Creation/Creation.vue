<template>
    <div id="creation">
        <inputContainer text="Hauteur" model="newHeight" placehoder="insert a height"></inputContainer>
        <inputContainer text="Largeur" model="newWidth" placehoder="insert a width"></inputContainer>
        <bouton className="button-create" v-on:click="click" text="Create grid"></bouton>
    </div>
</template>

<script>
  import Bouton from 'src/components/Bouton/Bouton'
  import InputContainer from 'src/components/InputContainer/InputContainer'

  export default {
    name: 'creation',
    props: ['newHeight', 'newWidth'],
    methods: {
      click: function () {
        this.$emit('click')
      }
    },
    components: {
      Bouton,
      InputContainer
    }
  }
</script>