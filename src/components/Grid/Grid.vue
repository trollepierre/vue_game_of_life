<template>
    <div id="grid">
        <canvas :width="width" :height="height" style="border:1px solid #BBB;"
                v-insert-in-canvas="{ cells: cells, color: 'white' }"></canvas>
    </div>
</template>

<script>
  export default {
    name: 'grid',
    props: ['cells', 'width', 'height'],
    directives: {
      insertInCanvas: function (canvasElement, binding) {
        const ctx = canvasElement.getContext('2d')
        const cells = binding.value.cells

        ctx.clearRect(0, 0, canvasElement.width, canvasElement.height)

        // remplissage de la grille de cellules blanches
        ctx.fillStyle = binding.value.color
        for (let i = 0; i < cells.length; i++) {
          if (cells[i]['state'] === 'alive') {
            let x = cells[i]['x']
            let y = cells[i]['y']
            ctx.fillRect(10 * (x - 1), 10 * (y - 1), 10, 10)
          }
        }
      }
    }
  }
</script>

<style>
    canvas {
        margin-top: 30px;
    }
</style>
