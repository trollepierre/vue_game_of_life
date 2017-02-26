import Vue from "vue";
import Info from "src/components/Info";

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

    expect(vm.$el.innerHTML).to.equal('<p>La vie a évolué ' + counterFromApp + ' fois. </p> <p>Nombre de cellules en vie : ' + nbOfCells + '</p> <p>' + errorMessage + '</p>')
  })

  xit('should call function insertInCanvas', () => {
  })

})
