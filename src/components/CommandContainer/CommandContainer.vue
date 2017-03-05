<template>
    <div id="commandContainer">
        <bouton className="button-refresh" v-on:click="refresh" text="Refresh"></bouton>
        <bouton className="button-refresh-automatic" v-on:click="refreshAutomatic" text="Start Refresh Automatic"></bouton>
        <bouton className="button-stop" v-on:click="stopRefreshAutomatic" text="Stop refresh Automatic"></bouton>
    </div>
</template>

<script>
  import Bouton from 'src/components/Bouton/Bouton'

  export default {
    name: 'commandContainer',
    methods: {
      refresh: function () {
        this.$emit('refresh')
      },
      refreshAutomatic: function () {
        this.$emit('refreshAutomatic')
      },
      stopRefreshAutomatic: function () {
        this.$emit('stopRefreshAutomatic')
      }
    },
    components: {
      Bouton
    }
  }
</script>