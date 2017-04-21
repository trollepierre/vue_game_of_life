import Vue from 'vue';
import Grid from 'src/components/Grid/Grid';

function constructGridWithProps(Grid, propsData) {
  const Ctor = Vue.extend(Grid)
  return new Ctor({ propsData }).$mount()
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

  it('should bind function insertInCanvas with white color', () => {
    expect(canvas.getContext('2d').fillStyle).to.equal('#ffffff')
  })

  describe('function insertInCanvas', function () {
    it('should change fill style ', () => {
      // when
      vm.$options.directives.insertInCanvas.bind(canvas, { value: { cells: cells, color: 'red' } })

      // then
      expect(canvas.getContext('2d').fillStyle).to.equal('#ff0000')
    })

    xit('should change fillRect ', () => {
      // given
      // const ctx = sinon.spy();
      // const callback = sinon.stub(canvas,getContext);
      // callback.withArgs('2d').returns(ctx);
      // sinon.spy(canvas.getContext('2d'), clearRect)
      const cells = [{"x":1,"y":1,"state":"alive"}]

      // when
      vm.$options.directives.insertInCanvas.bind(canvas, { value: { cells: cells, color: 'red' } })

      // then
      console.log(canvas.getContext('2d'))
      expect(canvas.getContext('2d').hash()).to.equal(1)
      // sinon.assert.calledOnce(canvas.getContext)
    })
  });
})
