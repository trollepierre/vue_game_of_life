<template>
    <div id="app">
        <div id="bandeau">
            <info :counter="counter" :numberOfAliveCells="numberOfAliveCells" :errorMessage="errorMessage"></info>
            <creation v-on:click="newCreate"></creation>
            <command-container v-on:refresh="refresh" v-on:refreshAutomatic="refreshAutomatic"
                               v-on:stopRefreshAutomatic="stopRefreshAutomatic"></command-container>
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
  import eventManager from '../src/helpers/eventManager.js'

  export default {
    name: 'app',
    data () {
      return {
        width: 1000,
        height: 500,
        newWidth: 100,
        newHeight: 50,
        cells: 'cells',
        numberOfAliveCells: 'Non connu',
        counter: 0,
        idInterval: 'Refresh Auto Not Started',
        baseUrl: 'https://glacial-hamlet-53356.herokuapp.com/',
//        baseUrl: 'http://localhost:9292/',
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
      newCreate: function (dimension) {
        if (dimension.height === '' || dimension.width === '' ||
          dimension.height === '0' || dimension.width === '0') {
          dimension.height = '50'
          dimension.width = '100'
        }

        console.log('création intelligente d une nouvelle grille formattée', dimension)
        this.$http
          .get(this.baseUrl + 'newCreate/100/height/' + dimension.height + '/width/' + dimension.width)
          .then((response) => {
            this.cells = response.body
            this.width = this.cells[this.cells.length - 1]['x'] * 10
            this.height = this.cells[this.cells.length - 1]['y'] * 10
            this.counter = 0
            this.refreshAutomatic()
          }, () => {
            this.stopRefreshAutomatic()
            this.errorMessage = 'Le get newCreate/100/height/' + dimension.height + '/width/' + dimension.width + ' est en échec'
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
            this.errorMessage = 'La Base semble être KO !'
            console.log(this.errorMessage)
          })
        this.$http
          .get(this.baseUrl + 'grids/100/count/alive')
          .then((response) => {
            if (response.body !== '0') {
              this.numberOfAliveCells = response.body
            } else {
              console.log('0 cellules comptées')
            }
          }, () => {
            this.stopRefreshAutomatic()
            this.errorMessage = 'La Base semble être KO !'
            console.log(this.errorMessage)
          })
      },
      refreshAutomatic: function () {
        if (this.idInterval === 'Refresh Auto Not Started') {
          this.idInterval = setInterval(this.refresh, 1000)
        }
      },
      stopRefreshAutomatic: function () {
        eventManager.stopCallingRefreshAuto(this.idInterval)
        this.idInterval = 'Refresh Auto Not Started'
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

    #bandeau {
        display: flex;
    }

    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: white;
        margin-top: 30px;
    }
</style>
