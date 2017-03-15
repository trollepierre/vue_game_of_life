<template>
    <div id="creation">
        <inputContainer text="Hauteur" v-on:input="height" value="updateNewWidth"
                        placehoder="insert a height"></inputContainer>
        <inputContainer text="Largeur" v-on:input="width" value="updateNewWidth" placehoder="insert a width"></inputContainer>
        <bouton className="button-create" v-on:click="click" text="Create grid"></bouton>
    </div>
</template>

<script>
  import Bouton from 'src/components/Bouton/Bouton'
  import InputContainer from 'src/components/InputContainer/InputContainer'

  export default {
    name: 'creation',
    props: ['newHeight', 'newWidth'],
    data () {
      return {
        updatedNewHeight: '',
        updatedNewWidth: ''
      }
    },
    methods: {
      click: function () {
        this.$emit('click')
      },
      width: function (value) {
        this.$emit('updateNewWidth', value)
      },
      height: function (value) {
        this.$emit('updateNewHeight', value)
      }
    },
    components: {
      Bouton,
      InputContainer
    }
  }
</script>