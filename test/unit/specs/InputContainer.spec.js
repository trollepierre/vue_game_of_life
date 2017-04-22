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

  describe('method updateValue', function () {
    describe('when value is a number', function () {
      it('should bind updateValue with value model on input', () => {
        // given
        let inputElement = vm.$el.querySelector('input')
        sinon.spy(vm, '$emit')

        // when
        let event = new Event('input')
        inputElement.dispatchEvent(event)

        // then
        sinon.assert.calledOnce(vm.$emit)
      })

      it('should emit input and formatted value ', () => {
        sinon.spy(vm, '$emit')
        vm.updateValue('42')
        sinon.assert.calledWith(vm.$emit, 'input', 42)
      })

      describe('when value should be trimmed', function () {
        it('should format value before emitting ', () => {
          sinon.spy(vm, '$emit')
          vm.updateValue('42 \n ')
          sinon.assert.calledWith(vm.$emit, 'input', 42)
        })

        it('should update value in model when formatted value is different SO when a new emit happen, the formatted value is emitted', () => {
          // given
          let inputElement = vm.$el.querySelector('input')
          let event = new Event('input')
          sinon.spy(vm, '$emit')

          // when
          vm.updateValue('42 \n ')

          // then
          inputElement.dispatchEvent(event)
          sinon.assert.calledWith(vm.$emit, 'input', 42)
        })
      })
    })

    describe('when value is NOT a number', function () {
      it('should not emit when input is text', () => {
        const mySpy = sinon.spy(vm, '$emit')
        vm.updateValue('azerty')
        expect(mySpy.called).to.be.false
      })

      it('should update value in model when formatted value is different SO when a new emit happen, a zero value is emitted', () => {
        // given
        let inputElement = vm.$el.querySelector('input')
        let event = new Event('input')
        sinon.spy(vm, '$emit')

        // when
        vm.updateValue('azerty \n ')

        // then
        inputElement.dispatchEvent(event)
        sinon.assert.calledWith(vm.$emit, 'input', 0)
      })
    })
  })
})
