import Vue from 'vue';
import VueResource from 'vue-resource';
import App from 'src/App';

Vue.use(VueResource);

function constructAppWithProps(App, data) {
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

  describe('data', function () {
    it('should set default data', function () {
      expect(vm.$data.width).to.equal(1000)
      expect(vm.$data.height).to.equal(500)
      expect(vm.$data.newWidth).to.equal(100)
      expect(vm.$data.newHeight).to.equal(50)
      expect(vm.$data.cells).to.equal('cells')
      expect(vm.$data.numberOfAliveCells).to.equal('Non connu')
      expect(vm.$data.counter).to.equal(0)
      expect(vm.$data.idInterval).to.equal('Refresh Auto Not Started')
      expect(vm.$data.baseUrl).to.equal('http://localhost:9292/')
      expect(vm.$data.errorMessage).to.equal('Pas d\'erreurs')
    })
  })

  describe('created', function () {
    xit('should add event listener', function () {

    })
  })

  describe('checkKey', function () {
    xit('should call newCreate if c', function () {
    })
    xit('should call stopRefreshAuto if Escape', function () {
    })
    xit('should call stopRefreshAuto if s', function () {
    })
    xit('should call refreshAuto if Enter', function () {
    })
    xit('should call refreshAuto if a', function () {
    })
    xit('should call refresh if ArrowRight', function () {
    })
    xit('should call refresh if r', function () {
    })
  })

  describe('refresh', function () {
    xit('should increase counter', function () {
      // given
      const promiseCall = sinon.stub(Vue, 'http').returnsPromise();
      promiseCall.resolves({
        body: {
          cells: [{x: "1", y: "1", state: "alive"}],
        }
      });
      vm = constructAppWithProps(App)

      // when
      vm.refresh()
      // then
      expect(promiseCall).to.have.been.called;
      // expect(promiseCall).to.have.been.calledWith({
      //   method: 'get',
      //   url: 'http://pokeapi.co/api/v2/pokemon/'
      // });
      expect(vm.$data.counter).to.equal(1)

      // after
      Vue.http.restore();
    })
  })


  describe('refreshAutomatic', function () {
    xit('should use setInterval and call refresh', function () {
    })
  })

  describe('stopRefreshAutomatic', function () {
    xit('should use clearInterval', function () {
    })
  })

  describe('updateNewHeight', function () {
    it('should replace newHeight by value', function () {
      // given
      let value = 17432

      // when
      vm.updateNewHeight(value)

      // then
      expect(vm.$data.newHeight).to.equal(value)
    })
  })

  describe('updateNewWidth', function () {
    it('should replace newWidth by value', function () {
      // given
      let value = 17432

      // when
      vm.updateNewWidth(value)

      // then
      expect(vm.$data.newWidth).to.equal(value)
    })
  })
})
