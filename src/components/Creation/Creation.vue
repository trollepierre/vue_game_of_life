<template>
    <div id="creation">
        <input-container
                text="Hauteur"
                v-on:input="height"
                value="updateNewWidth"
                placehoder="insert a height">
        </input-container>
        <input-container
                text="Largeur"
                v-on:input="width"
                value="updateNewWidth"
                placehoder="insert a width">
        </input-container>
        <bouton
                className="button-create"
                v-on:click="click"
                text="Create grid">
        </bouton>
    </div>
</template>

<script>
  import Bouton from 'src/components/Bouton/Bouton'
  import InputContainer from 'src/components/InputContainer/InputContainer'

  export default {
    name: 'creation',
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

<style>
    .button-create {
        background-color: blue;
        color: white;
    }

    #creation {
        width: 33%;
    }
</style>

