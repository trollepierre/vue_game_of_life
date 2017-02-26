import Vue from "vue";
import Grid from "src/components/Grid";

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

    expect(vm.$el.innerHTML).to.equal('<canvas width="' + expectedWidth + '" height="' + expectedHeight + '" style="border: 1px solid rgb(187, 187, 187);"></canvas>')
  })

  xit('should call function insertInCanvas', () => {
  })

})
