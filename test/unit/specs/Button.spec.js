import Vue from 'vue'
import Bouton from 'src/components/Bouton/Bouton'

function constructBoutonWithProps (Bouton, propsData) {
  const Constructor = Vue.extend(Bouton)
  return new Constructor({ propsData }).$mount()
}

describe('Bouton.vue', () => {
  let vm, className, text

  beforeEach(function () {
    className = 'button-create'
    text = 'Create intelligent and formatted grid'
    const propsData = {
      className: className,
      text: text
    }
    vm = constructBoutonWithProps(Bouton, propsData)
  })

  it('checks sanity', () => {
    expect(vm.$el.className).to.equal('button')
  })

  it('should add prop class to button', () => {
    expect(vm.$el.querySelector('button').className).to.equal(className)
  })

  it('should add prop text to button', () => {
    expect(vm.$el.querySelector('button').innerHTML).to.equal(text)
  })

  it('should render onClick', () => {
    // given
    sinon.spy(vm, '$emit')
    // sinon.spy(vm, 'buttonClick')
    let button = vm.$el.querySelector('button')

    // when
    button.click()

    // then
    sinon.assert.calledOnce(vm.$emit)
    // sinon.assert.calledOnce(vm.buttonClick)
  })

  describe('on method click', function () {
    it('should emit click ', () => {
      sinon.spy(vm, '$emit')
      vm.buttonClick()
      sinon.assert.calledWith(vm.$emit, 'click')
    })
  })
})
