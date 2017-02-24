<template>
    <div id="app">
        <p>La vie a évolué {{ counter }} fois. </p>
        <p>Nombre de cellules en vie : {{ numberOfAliveCells }}</p>
        <p>{{ errorMessage }}</p>
        <p>Hauteur de la nouvelle grille à créer :<input v-model="newHeight" placeholder="insert a height"></p>
        <p>Largeur de la nouvelle grille à créer :<input v-model="newWidth" placeholder="insert a width"></p>
        <button class="button-create" v-on:click="newCreate">Create intelligent and formatted grid</button>
        <button class="button-refresh" v-on:click="refresh">Refresh</button>
        <button class="button-refresh-automatic" v-on:click="refreshAutomatic">Start Refresh Automatic</button>
        <button class="button-stop" v-on:click="stopRefreshAutomatic">Stop refresh Automatic</button>
        <br>
        <grid :cells="cells" :width="width" :height="height"></grid>
    </div>
</template>

<script>
  import Grid from 'src/components/Grid'

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
        errorMessage: ''
      }
    },
    components: {
      Grid
    },
    created () {
      window.addEventListener('keyup', this.checkKey)
      window.addEventListener('click', this.refresh)
      this.refreshAutomatic()
    },
    methods: {
      checkKey: function (e) {
        if (e.key === 'c') {
          this.create()
        } else if (e.key === 'Escape' || e.key === 's') {
          this.stopRefreshAutomatic()
        } else if (e.key === 'Enter' || e.key === 'a') {
          this.refreshAutomatic()
        } else if (e.key === 'ArrowRight' || e.key === 'r') {
          this.refresh()
        }
      },
      refresh: function () {
        this.counter += 1
        this.$http
          .get('http://localhost:9292/grids/100')
          .then((response) => {
            this.cells = response.body
            this.width = this.cells[this.cells.length - 1]['x'] * 10
            this.height = this.cells[this.cells.length - 1]['y'] * 10
          }, () => {
            this.stopRefreshAutomatic()
            this.errorMessage = 'le get /grids/100 est en échec'
            console.log(this.errorMessage)
          })
        this.$http
          .get('http://localhost:9292/grids/100/count/alive')
          .then((response) => {
            this.numberOfAliveCells = response.body
          }, () => {
            this.stopRefreshAutomatic()
            this.errorMessage = 'Le get /grids/100/count/alive est en échec'
            console.log(this.errorMessage)
          })
      },
      newCreate: function () {
        console.log('création intelligente d une nouvelle grille formattée')
        this.$http
          .get('http://localhost:9292/newCreate/100/height/' + this.newHeight + '/width/' + this.newWidth)
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
      refreshAutomatic: function () {
        this.oldId = this.idInterval
        this.idInterval = setInterval(this.refresh, 500)
      },
      stopRefreshAutomatic: function () {
        clearInterval(this.idInterval)
        clearInterval(this.oldId)
      }
    }
  }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
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
