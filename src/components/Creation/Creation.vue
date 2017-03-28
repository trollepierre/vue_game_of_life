<template>
    <div id="creation">
        <input-container
                text="Hauteur"
                v-on:input="height"
                value="updatedNewHeight"
                placeholder="insert a height">
        </input-container>
        <input-container
                text="Largeur"
                v-on:input="width"
                value="updatedNewWidth"
                placeholder="insert a width">
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
        let dimension = {
          height: this.updatedNewHeight,
          width: this.updatedNewWidth
        }
        this.$emit('click', dimension)
      },
      width: function (value) {
        this.updatedNewWidth = value
      },
      height: function (value) {
        this.updatedNewHeight = value
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

