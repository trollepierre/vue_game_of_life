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

  it('should render refresh', () => {
    // given
    let $refreshButton = vm.$el.querySelector('button.button-refresh')
    sinon.spy(vm, '$emit')

    // when
    $refreshButton.click()

    // then
    sinon.assert.calledWith(vm.$emit, 'refresh')
  })

  it('should render refreshAuto', () => {
    // given
    let $refreshAutoButton = vm.$el.querySelector('button.button-refresh-automatic')
    sinon.spy(vm, '$emit')

    // when
    $refreshAutoButton.click()

    // then
    sinon.assert.calledWith(vm.$emit, 'refreshAutomatic')
  })

  it('should render stopRefreshAuto', () => {
    // given
    let $stopButton = vm.$el.querySelector('button.button-stop')
    sinon.spy(vm, '$emit')

    // when
    $stopButton.click()

    // then
    sinon.assert.calledWith(vm.$emit, 'stopRefreshAutomatic')
  })
})
