import Vue from "vue";
import Grid from "src/components/Grid";

function getInnerHtml(Grid, propsData) {
  const Ctor = Vue.extend(Grid)
  const vm = new Ctor({propsData}).$mount()
  return vm.$el.innerHTML
}

describe('Grid.vue', () => {
  it('should render canvas with expected width and height', () => {
    const expectedHeight = '150'
    const expectedWidth = '234'
    expect(getInnerHtml(Grid, {
      height: expectedHeight,
      width: expectedWidth,
      cells: {}
    })).to.equal('<canvas width="' + expectedWidth + '" height="' + expectedHeight + '" style="border: 1px solid rgb(187, 187, 187);"></canvas>')
  })
})
