import Vue from 'vue'
import Creation from 'src/components/Creation/Creation'

function constructCreationWithProps (Creation, propsData) {
  const Constructor = Vue.extend(Creation)
  return new Constructor({ propsData }).$mount()
}

describe('Creation.vue', () => {
  let vm
  beforeEach(function () {
    const propsData = {
      width: 500,
      height: 100
    }
    vm = constructCreationWithProps(Creation, propsData)
  })

  it('checks sanity', () => {
    expect(vm.$el.id).to.equal('creation')
  })

  it('should render the input container for width', () => {
    let threeButtons = vm.$el.querySelectorAll('div.inputContainer p')
    expect(threeButtons[0].innerText).to.contain('Hauteur de la nouvelle grille à créer :')
  })

  it('should render the input container for height', () => {
    let threeButtons = vm.$el.querySelectorAll('div.inputContainer p')
    expect(threeButtons[1].innerText).to.contain('Largeur de la nouvelle grille à créer :')
  })

  it('should render the creation Bouton', () => {
    let threeButtons = vm.$el.querySelectorAll('div.button button')
    expect(threeButtons[0].innerText).to.equal('Create grid')
  })

  xit('should render click, updateNewWidth and Height', () => {
    // given
    let $button = vm.$el.querySelector('button')
    sinon.spy($button, '$emit')

    // when
    $button.click()

    // then
    sinon.assert.calledOnce($button.$emit)
  })
})
