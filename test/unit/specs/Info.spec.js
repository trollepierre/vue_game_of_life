import Vue from 'vue'
import Info from 'src/components/Info/Info'

function constructInfoWithProps (Info, propsData) {
  const Ctor = Vue.extend(Info)
  return new Ctor({ propsData }).$mount()
}

describe('Info.vue', () => {
  let vm, counter, nbOfCells, errorMessage

  beforeEach(function () {
    counter = '150'
    nbOfCells = '234'
    errorMessage = 'Le get est en erreur'

    const propsData = {
      counter: counter,
      numberOfAliveCells: nbOfCells,
      errorMessage: errorMessage
    }

    vm = constructInfoWithProps(Info, propsData)
  })

  it('checks sanity', () => {
    expect(vm.$el.id).to.equal('informations')
  })

  it('should inject counter prop inside paragraph', () => {
    expect(vm.$el.querySelector('p.turnMessage').textContent).to.equal('La vie a évolué ' + counter + ' fois.')
  })

  it('should inject numberOfAliveCells prop inside paragraph', () => {
    expect(vm.$el.querySelector('p.aliveMessage').textContent).to.equal('Nombre de cellules en vie : ' + nbOfCells)
  })

  it('should inject errorMessage prop', () => {
    expect(vm.$el.querySelector('p.errorMessage').textContent).to.equal(errorMessage)
  })
})
