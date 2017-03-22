import Vue from 'vue'
import Grid from 'src/components/Grid/Grid'

function constructGridWithProps (Grid, propsData) {
  const Ctor = Vue.extend(Grid)
  return new Ctor({propsData}).$mount()
}

describe('Grid.vue', () => {
  let vm, expectedHeight, expectedWidth, canvas, cells

  beforeEach(function () {
    expectedHeight = '150'
    expectedWidth = '234'
    cells = {}
    const propsData = {
      height: expectedHeight,
      width: expectedWidth,
      cells: cells
    }
    vm = constructGridWithProps(Grid, propsData)
    canvas = vm.$el.querySelector('canvas')
  })

  it('checks sanity', () => {
    expect(vm.$el.id).to.equal('grid')
  })

  it('should contain canvas with props width ', () => {
    expect(canvas.getAttribute('width')).to.equal(expectedWidth)
  })

  it('should contain canvas with props height', () => {
    expect(canvas.getAttribute('height')).to.equal(expectedHeight)
  })

  xit('should bind function insertInCanvas', () => {
    sinon.spy(vm, 'insertInCanvas')
    vm = constructGridWithProps(Grid, {})
    sinon.assert.calledOnce(vm.insertInCanvas)
  })

  xit('should call function insertInCanvas', () => {
    // when
    vm.insertInCanvas(canvas, {cells: cells, color: 'white'})
    // then
  })
})
