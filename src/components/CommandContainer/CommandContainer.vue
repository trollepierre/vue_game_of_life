<template>
    <div id="commandContainer">
        <bouton className="button-refresh" onClick="refresh" text="Refresh"></bouton>
        <bouton className="button-refresh-automatic" onClick="refreshAutomatic" text="Start Refresh Automatic"></bouton>
        <bouton className="button-stop" onClick="stopRefreshAutomatic" text="Stop refresh Automatic"></bouton>
    </div>
</template>

<script>
  import Bouton from 'src/components/Bouton/Bouton'

  export default {
    name: 'commandContainer',
    components: {
      Bouton
    }
  }
</script>