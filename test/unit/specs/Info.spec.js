import Vue from "vue";
import Info from "src/components/Info/Info";

function constructInfoWithProps(Info, propsData) {
  const Ctor = Vue.extend(Info)
  return new Ctor({propsData}).$mount();
}

describe('Info.vue', () => {
  it('should render expected informations bloc', () => {
    const counterFromApp = '150'
    const nbOfCells = '234'
    const errorMessage = 'Le get est en erreur'
    const propsData = {
      counter: counterFromApp,
      numberOfAliveCells: nbOfCells,
      errorMessage: errorMessage
    }
    const vm = constructInfoWithProps(Info, propsData);

    expect(vm.$el.querySelector('p.turnMessage').textContent).to.equal('La vie a évolué ' + counterFromApp + ' fois.')
    expect(vm.$el.querySelector('p.aliveMessage').textContent).to.equal('Nombre de cellules en vie : ' + nbOfCells)
    expect(vm.$el.querySelector('p.errorMessage').textContent).to.equal(errorMessage)
  })

  xit('should call function insertInCanvas', () => {
  })

})
