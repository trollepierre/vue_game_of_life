<template>
    <div id="grid">
        <canvas :width="width" :height="height" style="border:1px solid #BBB;" v-insert-in-canvas="cells"></canvas>
    </div>
</template>

<script>
  export default {
    name: 'grid',
    props: ['cells', 'width', 'height'],
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
    canvas {
        margin-top: 30px;
    }
</style>
