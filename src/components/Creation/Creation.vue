<template>
    <div id="creation">
        <inputContainer text="Hauteur de la nouvelle grille à créer : " model="newHeight" placehoder="insert a height"></inputContainer>
        <inputContainer text="Largeur de la nouvelle grille à créer : " model="newWidth" placehoder="insert a width"></inputContainer>
        <bouton className="button-create" onClick="newCreate" text="Create grid"></bouton>
    </div>
</template>

<script>
  import Bouton from 'src/components/Bouton/Bouton'
  import InputContainer from 'src/components/InputContainer/InputContainer'

  export default {
    name: 'creation',
    props: ['newHeight', 'newWidth'],
    components: {
      Bouton,
      InputContainer
    }
  }
</script>