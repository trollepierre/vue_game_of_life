import Vue from 'vue'
import CommandContainer from 'src/components/CommandContainer/CommandContainer'

function constructCommandContainerWithProps (CommandContainer) {
  const Constructor = Vue.extend(CommandContainer)
  return new Constructor().$mount()
}

describe('CommandContainer.vue', () => {
  let vm, threeButtons

  beforeEach(function () {
    vm = constructCommandContainerWithProps(CommandContainer)
    threeButtons = vm.$el.querySelectorAll('div.button button')
  })

  it('checks sanity', () => {
    expect(vm.$el.id).to.equal('commandContainer')
  })

  it('should render refresh Bouton', () => {
    expect(threeButtons[0].innerText).to.equal('Refresh')
  })

  it('should render refresh auto Bouton', () => {
    expect(threeButtons[1].innerText).to.equal('Start Refresh Automatic')
  })

  it('should render stop refresh Bouton', () => {
    expect(threeButtons[2].innerText).to.equal('Stop refresh Automatic')
  })

  xit('should render refresh, refreshAuto and stopRefreshAuto', () => {
    // given
    let $button = vm.$el.querySelector('button')
    sinon.spy($button, '$emit')

    // when
    $button.click()

    // then
    sinon.assert.calledOnce($button.$emit)
  })
})
