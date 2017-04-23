import Vue from 'vue'
import Creation from 'src/components/Creation/Creation'
import InputContainer from 'src/components/InputContainer/InputContainer'
import Bouton from 'src/components/Bouton/Bouton'

function constructCreationWithProps (Creation) {
  const Constructor = Vue.extend(Creation)
  return new Constructor().$mount()
}

describe('Creation.vue', () => {
  let vm
  beforeEach(function () {
    vm = constructCreationWithProps(Creation)
  })

  it('checks sanity', () => {
    expect(vm.$el.id).to.equal('creation')
  })

  it('should render the input container for height', () => {
    // le TU
    let inputContainer = vm.$options.components.InputContainer
    expect(inputContainer).to.contain(InputContainer)

    // d'autres TUs
    expect(vm.$options.components.InputContainer.props).to.haveOwnProperty('placeholder')
    expect(vm.$options.components.InputContainer.props).to.haveOwnProperty('text')

    // le TI
    let paragraphs = vm.$el.querySelectorAll('div.inputContainer p')
    expect(paragraphs[0].innerText).to.contain('Hauteur de la nouvelle grille à créer :')
  })

  xit('should render the input container for height', () => {
    // le TU complémentaire pour remplacer le TI
    expect(vm.$options.components.InputContainer.props.placeholder).to.equal('placeholder')
    expect(vm.$options.components.InputContainer.props.text).to.equal('text')
  })

  it('should render the input container for height', () => {
    let inputContainer = vm.$options.components.InputContainer
    expect(inputContainer).to.contain(InputContainer)

    let paragraphs = vm.$el.querySelectorAll('div.inputContainer p')
    expect(paragraphs[1].innerText).to.contain('Largeur de la nouvelle grille à créer :')
  })

  it('should render the creation Bouton', () => {
    let button = vm.$el.querySelectorAll('div.button button')
    let bouton = vm.$options.components.Bouton
    expect(bouton).to.contain(Bouton)
    expect(button[0].innerText).to.equal('Create grid')
  })

  describe('data', function () {
    it('should set default data', function () {
      expect(vm.$data.updatedNewHeight).to.equal('')
      expect(vm.$data.updatedNewWidth).to.equal('')
    })
  })

  describe('width', () => {
    it('should bind updateValue with value model on input', () => {
      // when
      let inputContainer = vm.$el.querySelectorAll('input')[1]

      // when
      inputContainer.value = '55'
      inputContainer.dispatchEvent(new Event('input'))

      // then
      expect(vm.$data.updatedNewWidth).to.equal(55)
    })

    it('should update new width', () => {
      vm.width(45)
      expect(vm.$data.updatedNewWidth).to.equal(45)
    })
  })

  describe('height', () => {
    it('should bind updateValue with value model on input', () => {
      // when
      let inputContainer = vm.$el.querySelectorAll('input')[0]

      // when
      inputContainer.value = '55'
      inputContainer.dispatchEvent(new Event('input'))

      // then
      expect(vm.$data.updatedNewHeight).to.equal(55)
    })

    it('should update new height', () => {
      vm.height(99)
      expect(vm.$data.updatedNewHeight).to.equal(99)
    })
  })

  describe('click', () => {
    it('should bind click on button click', () => {
      // given
      let boutonElement = vm.$el.querySelector('button')
      sinon.spy(vm, '$emit')

      // when
      boutonElement.click()

      // then
      sinon.assert.calledOnce(vm.$emit)
    })

    it('should emit', () => {
      sinon.spy(vm, '$emit')
      vm.click()
      sinon.assert.calledOnce(vm.$emit)
    })

    it('should emit input and formatted value ', () => {
      // given
      sinon.spy(vm, '$emit')
      let emptyPropsData = {
        width: '',
        height: ''
      }
      // when
      vm.click()
      // then
      sinon.assert.calledWith(vm.$emit, 'click', emptyPropsData)
    })
  })
})
