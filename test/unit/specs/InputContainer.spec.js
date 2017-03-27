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

  it('should bind updateValue with value model on input', () => {
    // given
    let inputElement = vm.$el.querySelector('input')
    sinon.spy(vm, '$emit')
    let event = document.createEvent('Event');

    // when
    event.initEvent('input', true, true); //can bubble, and is cancellable
    inputElement.dispatchEvent(event);

    // then
    sinon.assert.calledOnce(vm.$emit)
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

    it('should format value before emitting ', () => {
      sinon.spy(vm, '$emit')
      vm.updateValue('42 \n ')
      sinon.assert.calledWith(vm.$emit, 'input', 42)
    })

    xit('should update value in model when formatted value is different ', () => {
      let inputElement = vm.$el.querySelector('input')
      vm.updateValue('42 \n ')
      expect(inputElement.$ref.input.value).to.equal('42')
    })

    xit('should format value before emitting ', () => {
      sinon.spy(vm, '$emit')
      vm.updateValue('42 \n 4')
      sinon.assert.neverCalled(vm.$emit)
    })
  })
})
