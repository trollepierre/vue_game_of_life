import Vue from 'vue'
import InputContainer from 'src/components/InputContainer/InputContainer'

function constructInputContainerWithProps (InputContainer, propsData) {
  const Constructor = Vue.extend(InputContainer)
  return new Constructor({ propsData }).$mount()
}

describe('InputContainer.vue', () => {
  let vm
  beforeEach(function () {
    let propsData = {
      text: 'Hauteur',
      placeholder: 'placeholder'
    }
    vm = constructInputContainerWithProps(InputContainer, propsData)
  })

  it('checks sanity', () => {
    expect(vm.$el.className).to.equal('inputContainer')
  })

  it('should add prop text', () => {
    expect(vm.$el.querySelector('p').textContent).to.contain('Hauteur de la nouvelle grille à créer :')
  })

  it('should add prop placeholder', () => {
    expect(vm.$el.querySelector('input').getAttribute('placeholder')).to.equal('placeholder')
  })

  xit('should bind updateValue with value model on input', () => {
    let inputElement = vm.$el.querySelector('input')
    expect(inputElement.getAttribute('placeholder')).to.equal('placeholder')

    let bool = false
    inputElement.addEventListener('input', () => { bool = true })

    inputElement.change('e')
    expect(bool).to.equal(true)

    expect(vm.$emit('input'))
  })

  describe('method updateValue', function () {
    it('should emit', function () {
      sinon.spy(vm, '$emit')

      vm.updateValue('hauteur')
      sinon.assert.calledOnce(vm.$emit)
    })

    it('should emit input and formatted value ', () => {
      sinon.spy(vm, '$emit')
      vm.updateValue('42')
      sinon.assert.calledWith(vm.$emit, 'input', 42)
    })
  })
})
