import Vue from "vue";
import Bouton from "src/components/Bouton/Bouton";

function constructBoutonWithProps(Bouton, propsData) {
  const Ctor = Vue.extend(Bouton)
  return new Ctor({propsData}).$mount();
}

describe('Bouton.vue', () => {
  it('should render expected button bloc', () => {
    const className = 'button-create'
    const onClick = 'newCreate'
    const text = 'Create intelligent and formatted grid'
    const propsData = {
      className: className,
      onClick: onClick,
      text: text
    }
    const vm = constructBoutonWithProps(Bouton, propsData);

    expect(vm.$el.querySelector('button').getAttribute("class")).to.equal(className)
    // expect(vm.$el.querySelector('button').getAttribute("v-on:click")).to.equal(onClick)
    expect(vm.$el.querySelector('button').innerHTML).to.equal(text)
  })

  xit('should render onClick', () => {

  })
})
