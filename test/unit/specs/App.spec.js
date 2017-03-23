import Vue from 'vue'
import App from 'src/App'

function constructAppWithProps (App) {
  const Ctor = Vue.extend(App)
  return new Ctor().$mount()
}

describe('App.vue', () => {
  let vm, bandeau
  beforeEach(function () {
    vm = constructAppWithProps(App)
    bandeau = vm.$el.querySelector('#bandeau')
  })

  it('checks sanity', () => {
    expect(vm.$el.id).to.equal('app')
  })

  it('should contain a bandeau', () => {
    expect(bandeau).not.to.be.empty
  })

  it('should contain a info inside bandeau', () => {
    expect(bandeau.querySelector('#informations')).not.to.be.empty
  })

  it('should contain a creation inside bandeau', () => {
    expect(bandeau.querySelector('#creation')).not.to.be.empty
  })

  it('should contain a comandContainer inside bandeau', () => {
    expect(bandeau.querySelector('#commandContainer')).not.to.be.empty
  })

  it('should contain a grid', () => {
    expect(vm.$el.querySelector('#grid')).not.to.be.empty
  })
})
