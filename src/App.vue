<template>
    <div id="app">
        <p>La vie a évolué {{ counter }} fois. </p>
        <p>Hauteur de la nouvelle grille à créer :
            <input v-model="newHeight" placeholder="insert a height">
        </p>
        <p>Largeur de la nouvelle grille à créer :
            <input v-model="newWidth" placeholder="insert a width">
        </p>
        <button class="button-post" v-on:click="postCreate">Post a new grid</button>
        <button class="button-smart-create" v-on:click="smartCreate">Create intelligent new grid</button>
        <button class="button-create" v-on:click="create">Create new grid</button>
        <button class="button-refresh" v-on:click="refresh">Refresh</button>
        <button class="button-refresh-automatic" v-on:click="refreshAutomatic">Start Refresh Automatic</button>
        <button class="button-stop" v-on:click="stopRefreshAutomatic">Stop refresh Automatic</button>
        <br>
        <canvas :width="width" :height="height" style="border:1px solid #BBB;"
                v-insert-in-canvas="cells">
        </canvas>
    </div>
</template>

<script>
  export default {
    name: 'app',
    data () {
      return {
        width: 1000,
        height: 500,
        newWidth: 100,
        newHeight: 50,
        grid: 'grid',
        cells: 100,
        counter: 0,
        idInterval: 17432,
        oldId: 17433
      }
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
            let json = response.body
            this.grid = JSON.parse(json)
            this.width = this.grid.length * 10
            this.height = this.grid.height * 10
            this.cells = this.grid.cells
            return this.cells
          }, () => {
            console.log('le refresh est en echec ')
          })
      },
      refreshAutomatic: function () {
        this.oldId = this.idInterval
        this.idInterval = setInterval(this.refresh, 500)
      },
      create: function () {
        console.log('création d une nouvelle grille ')
        this.$http
          .get('http://localhost:9292/create')
          .then((response) => {
            let json = response.body
            this.grid = JSON.parse(json)
            this.width = this.grid.length * 10
            this.height = this.grid.height * 10
            this.cells = this.grid.cells
            return this.cells
          }, () => {
            console.log('le create est en echec ')
          })
      },
      smartCreate: function () {
        console.log('création intelligente d une nouvelle grille ')
        this.$http
          .get('http://localhost:9292/create/100/height/' + this.newHeight + '/width/' + this.newWidth)
          .then((response) => {
            let json = response.body
            this.grid = JSON.parse(json)
            this.width = this.grid.length * 10
            this.height = this.grid.height * 10
            this.cells = this.grid.cells
            return this.cells
          }, () => {
            console.log('le smart create est en echec ')
          })
      },
      stopRefreshAutomatic: function () {
        console.log('un clic détecté ')
        clearInterval(this.idInterval)
        clearInterval(this.oldId)
      },
      postCreate () {
        this.$http
          .post('http://localhost:9292/grids', {height: '100', width: '50'})
          .then((response) => {
            let json = response.body
            this.grid = JSON.parse(json)
            this.width = this.grid.length * 10
            this.height = this.grid.height * 10
            this.cells = this.grid.cells
            return this.cells
          }, (response) => {
            console.log('le post est en echec ')
          })
      }
    },
    directives: {
      insertInCanvas: function (canvasElement, binding) {
        const ctx = canvasElement.getContext('2d')
        const width = canvasElement.width
        const height = canvasElement.height
        const cells = binding.value

        ctx.clearRect(0, 0, width, height)
        ctx.strokeStyle = 'red'
        ctx.fillStyle = 'black'
        for (let x = 0; x < width / 10; x++) {
          for (let y = 0; y < height / 10; y++) {
            ctx.strokeRect(10 * x, 10 * y, 10, 10)
          }
        }

        for (let x = 1; x <= width / 10; x++) {
          for (let y = 1; y <= height / 10; y++) {
            ctx.font = '30px Arial'
            if (cells['[' + x + ', ' + y + ']'] === 'alive') {
              ctx.fillRect(10 * (x - 1), 10 * (y - 1), 10, 10)
            }
          }
        }
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

    canvas {
        margin-top: 30px;
    }

    .button-post {
        background-color: black;
        color: white;
    }

    .button-create {
        background-color: blue;
        color: white;
    }

    .button-smart-create {
        background-color: hotpink;
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
