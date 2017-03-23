import Vue from 'vue'
import App from 'src/App'

function constructAppWithProps (App, data) {
  data = data || {}
  const Constructor = Vue.extend(App)
  return new Constructor(data).$mount()
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

  describe('bandeau', function () {
    it('should contain a bandeau', () => {
      expect(bandeau).not.to.be.empty
    })

    describe('info', function () {
      it('should contain a info inside bandeau', () => {
        expect(bandeau.querySelector('#informations')).not.to.be.empty
      })

      it('should pass errorMessage to vue', () => {
        let data = {
          data: {
            errorMessage: 'plop'
          }
        }
        vm = constructAppWithProps(App, data)
        expect(vm.$el.innerText).to.contain('plop')
      })

      it('should pass numberOfAliveCells to vue', () => {
        let data = {
          data: {
            numberOfAliveCells: 'numberOfAliveCells'
          }
        }
        vm = constructAppWithProps(App, data)
        expect(vm.$el.innerText).to.contain('numberOfAliveCells')
      })

      it('should pass counter to vue', () => {
        let data = {
          data: {
            counter: 'counter'
          }
        }
        vm = constructAppWithProps(App, data)
        expect(vm.$el.innerText).to.contain('counter')
      })
    })

    describe('creation', function () {
      it('should contain a creation inside bandeau', () => {
        expect(bandeau.querySelector('#creation')).not.to.be.empty
      })

      xit('should only react on click', () => {

      })
    })

    describe('command container', function () {
      it('should contain a comandContainer inside bandeau', () => {
        expect(bandeau.querySelector('#commandContainer')).not.to.be.empty
      })

      xit('should react on refresh click', () => {

      })

      xit('should react on  auto refresh click', () => {

      })

      xit('should react on  stop refresh click', () => {

      })
    })
  })

  describe('grid', function () {
    it('should contain a grid', () => {
      expect(vm.$el.querySelector('#grid')).not.to.be.empty
    })

    it('should get prop cells, width, height', () => {
      let expectedHeight = '151'
      let expectedWidth = '235'
      let cells = {}
      let data = {
        data: {
          height: expectedHeight,
          width: expectedWidth,
          cells: cells
        }
      }
      vm = constructAppWithProps(App, data)
      let canvas = vm.$el.querySelector('canvas')
      expect(canvas.getAttribute('width')).to.equal(expectedWidth)
      expect(canvas.getAttribute('height')).to.equal(expectedHeight)
    })
  })
})
