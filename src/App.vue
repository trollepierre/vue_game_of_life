<template>
    <div id="app">
        <div id="horizon">
            <info :counter="counter" :numberOfAliveCells="numberOfAliveCells" :errorMessage="errorMessage"></info>
            <creation v-on:updateNewWidth="updateNewWidth" v-on:updateNewHeight="updateNewHeight" :newHeight="newHeight" :newWidth="newWidth" v-on:click="newCreate"></creation>
            <commandContainer v-on:refresh="refresh" v-on:refreshAutomatic="refreshAutomatic" v-on:stopRefreshAutomatic="stopRefreshAutomatic"></commandContainer>
        </div>
        <br>
        <grid :cells="cells" :width="width" :height="height"></grid>
    </div>
</template>

<script>
  import Grid from 'src/components/Grid/Grid'
  import Info from 'src/components/Info/Info'
  import Bouton from 'src/components/Bouton/Bouton'
  import Creation from 'src/components/Creation/Creation'
  import CommandContainer from 'src/components/CommandContainer/CommandContainer'

  export default {
    name: 'app',
    data () {
      return {
        width: 1000,
        height: 500,
        newWidth: 100,
        newHeight: 50,
        cells: 'cells',
        numberOfAliveCells: 'Non connue',
        counter: 0,
        idInterval: 17432,
        oldId: 17433,
        baseUrl: 'http://localhost:9292/',
        errorMessage: 'Pas d\'erreurs'
      }
    },
    components: {
      Grid,
      Info,
      Bouton,
      Creation,
      CommandContainer
    },
    created () {
      window.addEventListener('keyup', this.checkKey)
      window.addEventListener('click', this.refresh)
      this.refreshAutomatic()
    },
    methods: {
      checkKey: function (e) {
        if (e.key === 'c') {
          this.newCreate()
        } else if (e.key === 'Escape' || e.key === 's') {
          this.stopRefreshAutomatic()
        } else if (e.key === 'Enter' || e.key === 'a') {
          this.refreshAutomatic()
        } else if (e.key === 'ArrowRight' || e.key === 'r') {
          this.refresh()
        }
      },
      newCreate: function () {
        console.log('création intelligente d une nouvelle grille formattée')
        this.$http
          .get(this.baseUrl + 'newCreate/100/height/' + this.newHeight + '/width/' + this.newWidth)
          .then((response) => {
            this.cells = response.body
            this.width = this.cells[this.cells.length - 1]['x'] * 10
            this.height = this.cells[this.cells.length - 1]['y'] * 10
            this.counter = 0
          }, () => {
            this.stopRefreshAutomatic()
            this.errorMessage = 'Le get /newCreate/100/height/' + this.newHeight + '/width/' + this.newWidth + 'est en échec'
            console.log(this.errorMessage)
          })
      },
      refresh: function () {
        this.counter += 1
        this.$http
          .get(this.baseUrl + 'grids/100')
          .then((response) => {
            this.cells = response.body
            this.width = this.cells[this.cells.length - 1]['x'] * 10
            this.height = this.cells[this.cells.length - 1]['y'] * 10
            this.errorMessage = 'Pas d\'erreurs'
          }, () => {
            this.stopRefreshAutomatic()
            this.errorMessage = 'le get /grids/100 est en échec'
            console.log(this.errorMessage)
          })
        this.$http
          .get(this.baseUrl + 'grids/100/count/alive')
          .then((response) => {
            this.numberOfAliveCells = response.body
          }, () => {
            this.stopRefreshAutomatic()
            this.errorMessage = 'Le get /grids/100/count/alive est en échec'
            console.log(this.errorMessage)
          })
      },
      refreshAutomatic: function () {
        this.oldId = this.idInterval
        this.idInterval = setInterval(this.refresh, 500)
      },
      stopRefreshAutomatic: function () {
        clearInterval(this.idInterval)
        clearInterval(this.oldId)
      },
      updateNewHeight: function (value) {
        this.newHeight = value
      },
      updateNewWidth: function (value) {
        this.newWidth = value
      }
    }
  }
</script>

<style>
    body {
        background-color: black;
    }

    #horizon {
        display: flex;
    }

    #creation, #refresh {
        width: 33%;
    }

    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: white;
        margin-top: 30px;
    }

    .button-create {
        background-color: blue;
        color: white;
    }

    .button-refresh {
        background-color: orange;
        color: white;
    }

    .button-refresh-automatic {
        background-color: green;
        color: white;
    }

    .button-stop {
        background-color: red;
        color: white;
    }
</style>
