import Vue from "vue";
import Grid from "src/components/Grid/Grid";

function constructGridWithProps(Grid, propsData) {
  const Ctor = Vue.extend(Grid)
  return new Ctor({propsData}).$mount();
}

describe('Grid.vue', () => {
  it('should render canvas with expected width and height', () => {
    const expectedHeight = '150'
    const expectedWidth = '234'
    const propsData = {
      height: expectedHeight,
      width: expectedWidth,
      cells: {}
    }
    const vm = constructGridWithProps(Grid, propsData);

    expect(vm.$el.querySelector('canvas').getAttribute('width')).to.equal(expectedWidth)
    expect(vm.$el.querySelector('canvas').getAttribute('height')).to.equal(expectedHeight)
  })

  xit('should call function insertInCanvas', () => {
  })

})
