<template src="./Grid.html"></template>

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
        ctx.fillStyle = 'white'
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

<style scoped src="./Grid.css"></style>
