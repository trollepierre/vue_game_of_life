<template>
    <div id="app">
        <p>La vie a évolué {{ counter }} fois. </p>
        <p>Hauteur de la nouvelle grille à créer :<input v-model="newHeight" placeholder="insert a height"></p>
        <p>Largeur de la nouvelle grille à créer :<input v-model="newWidth" placeholder="insert a width"></p>
        <button class="button-create" v-on:click="newCreate">Create intelligent and formatted grid</button>
        <button class="button-refresh" v-on:click="refresh">Refresh</button>
        <button class="button-refresh-automatic" v-on:click="refreshAutomatic">Start Refresh Automatic</button>
        <button class="button-stop" v-on:click="stopRefreshAutomatic">Stop refresh Automatic</button>
        <br>
        <canvas :width="width" :height="height" style="border:1px solid #BBB;" v-insert-in-canvas="cells"></canvas>
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
        cells: 'cells',
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
            this.cells = JSON.parse(json)
            this.width = this.cells[this.cells.length - 1]['x'] * 10
            this.height = this.cells[this.cells.length - 1]['y'] * 10
            return this.cells
          }, () => {
            console.log('le refresh est en echec ')
          })
      },
      newCreate: function () {
        console.log('création intelligente d une nouvelle grille formattée')
        this.$http
          .get('http://localhost:9292/newCreate/100/height/' + this.newHeight + '/width/' + this.newWidth)
          .then((response) => {
            let json = response.body
            this.cells = JSON.parse(json)
            this.width = this.cells[this.cells.length - 1]['x'] * 10
            this.height = this.cells[this.cells.length - 1]['y'] * 10
            return this.cells
          }, () => {
            console.log('le create est en echec ')
          })
      },
      refreshAutomatic: function () {
        this.oldId = this.idInterval
        this.idInterval = setInterval(this.refresh, 500)
      },
      stopRefreshAutomatic: function () {
        console.log('un clic détecté ')
        clearInterval(this.idInterval)
        clearInterval(this.oldId)
      }
    },
    directives: {
      insertInCanvas: function (canvasElement, binding) {
        const ctx = canvasElement.getContext('2d')
        const width = canvasElement.width
        const height = canvasElement.height
        const cells = binding.value

        ctx.clearRect(0, 0, width, height)
        ctx.strokeStyle = 'white'
        ctx.fillStyle = 'black'
        for (let x = 0; x < width / 10; x++) {
          for (let y = 0; y < height / 10; y++) {
            ctx.strokeRect(10 * x, 10 * y, 10, 10)
          }
        }

        for (let i = 0; i < cells.length; i++) {
          if (cells[i]['state'] === 'alive') {
            let x = cells[i]['x']
            let y = cells[i]['y']
            ctx.fillRect(10 * (x - 1), 10 * (y - 1), 10, 10)
          }
        }
        for (let x = 1; x <= width / 10; x++) {
          for (let y = 1; y <= height / 10; y++) {
            ctx.font = '30px Arial'
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
