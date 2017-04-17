import Vue from 'vue';
import VueResource from 'vue-resource';
import App from 'src/App';

Vue.use(VueResource)

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
      it('should contain a commandContainer inside bandeau', () => {
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
    it('should call refresh if ArrowRight', function () {
      // given
      let promiseCall, myCells
      promiseCall = sinon.stub(Vue, 'http').returnsPromise()
      myCells = { x: '1', y: '1', state: 'alive' }
      promiseCall.resolves({
        body: {
          cells: [myCells]
        }
      })
      vm = constructAppWithProps(App)
      let e = {}
      e.key = 'ArrowRight'

      // when
      vm.checkKey(e)

      // then
      expect(vm.$data.counter).to.equal(1)

      // after
      Vue.http.restore()
    })

    it('should call refresh if r', function () {
      // given
      let promiseCall, myCells
      promiseCall = sinon.stub(Vue, 'http').returnsPromise()
      myCells = { x: '1', y: '1', state: 'alive' }
      promiseCall.resolves({
        body: {
          cells: [myCells]
        }
      })
      vm = constructAppWithProps(App)
      let e = {}
      e.key = 'r'

      // when
      vm.checkKey(e)

      // then
      expect(vm.$data.counter).to.equal(1)

      // after
      Vue.http.restore()
    })
  })

  describe('newCreate', function () {
    let promiseCall, myCells

    afterEach(function () {
      Vue.http.restore()
    })

    describe('get grid without error', function () {
      beforeEach(function () {
        // given
        promiseCall = sinon.stub(Vue, 'http').returnsPromise()
        myCells = [{ x: '1', y: '1', state: 'alive' }]
        promiseCall.resolves({
          body: myCells
        })
        let data = {
          data: {
            counter: 78
          }
        }
        vm = constructAppWithProps(App, data)


        const dimension = {
          width: 123,
          height: 45
        }

        // when
        vm.newCreate(dimension)
      })

      it('should call promise with correct url', function () {
        expect(promiseCall).to.have.been.calledWith({
          method: 'get',
          url: 'http://localhost:9292/newCreate/100/height/45/width/123'
        })
      })

      it('should update cells', function () {
        expect(vm.$data.cells).to.equal(myCells)
      })

      it('should update width', function () {
        expect(vm.$data.width).to.equal(10)
      })

      it('should update height', function () {
        expect(vm.$data.height).to.equal(10)
      })

      it('should reset counter', function () {
        expect(vm.$data.counter).to.equal(0)
      })

      xit('should call refresh auto', function () {
        // expect(vm.$data.errorMessage).to.equal('Pas d\'erreurs')
      })
    })

    describe('get grid with error', function () {
      beforeEach(function () {
        // given
        promiseCall = sinon.stub(Vue, 'http').returnsPromise()
        myCells = [{ x: '1', y: '1', state: 'alive' }]
        promiseCall.rejects()
        vm = constructAppWithProps(App)

        const dimension = {
          width: 123,
          height: 45
        }

        // when
        vm.newCreate(dimension)
      })

      xit('should call stopRefreshAuto', function () {
        // expect(vm.$data.errorMessage).to.equal('La Base semble être KO !')
      })

      it('should change errorMessage', function () {
        expect(vm.$data.errorMessage).to.equal('Le get newCreate/100/height/45/width/123 est en échec')
      })
    })

    describe('get count of alive cells', function () {

      it('should set numberOfAliveCells to response body', function () {
        // given
        promiseCall = sinon.stub(Vue, 'http').returnsPromise()
        myCells = [{ x: '1', y: '1', state: 'alive' }]
        promiseCall.resolves({
          body: myCells
        })
        promiseCall.resolves({
          body: '88'
        })
        let data = {
          data: {
            numberOfAliveCells: '56'
          }
        }
        vm = constructAppWithProps(App, data)

        // when
        vm.refresh()

        // then
        expect(vm.$data.numberOfAliveCells).to.equal('88')
      })

      it('should NOT set numberOfAliveCells when response body is null', function () {
        // given
        promiseCall = sinon.stub(Vue, 'http').returnsPromise()
        myCells = [{ x: '1', y: '1', state: 'alive' }]
        promiseCall.resolves({
          body: myCells
        })
        promiseCall.resolves({
          body: '0'
        })
        let data = {
          data: {
            numberOfAliveCells: '56'
          }
        }
        vm = constructAppWithProps(App, data)

        // when
        vm.refresh()

        // then
        expect(vm.$data.numberOfAliveCells).to.equal('56')
      })

      describe('when count promise is rejected', function () {
        beforeEach(function () {
          // given
          promiseCall = sinon.stub(Vue, 'http').returnsPromise()
          myCells = [{ x: '1', y: '1', state: 'alive' }]
          promiseCall.resolves({
            body: myCells
          })
          promiseCall.rejects({})
          let data = {
            data: {
              numberOfAliveCells: '56'
            }
          }
          vm = constructAppWithProps(App, data)

          // when
          vm.refresh()
        });

        it('should NOT set numberOfAliveCells ', function () {
          expect(vm.$data.numberOfAliveCells).to.equal('56')
        })

        it('should set error message ', function () {
          expect(vm.$data.errorMessage).to.equal('La Base semble être KO !')
        })

        xit('should call stopRefreshAuto', function () {
          // expect(vm.$data.errorMessage).to.equal('La Base semble être KO !')
        })
      });
    })
  })

  describe('refresh', function () {
    let promiseCall, myCells

    afterEach(function () {
      Vue.http.restore()
    })

    describe('get grid without error', function () {
      beforeEach(function () {
        // given
        promiseCall = sinon.stub(Vue, 'http').returnsPromise()
        myCells = [{ x: '1', y: '1', state: 'alive' }]
        promiseCall.resolves({
          body: myCells
        })
        vm = constructAppWithProps(App)

        // when
        vm.refresh()
      })

      it('should increase counter', function () {
        expect(vm.$data.counter).to.equal(1)
      })

      it('should call promise with correct url', function () {
        expect(promiseCall).to.have.been.calledWith({
          method: 'get',
          url: 'http://localhost:9292/grids/100'
        })
      })

      it('should update cells', function () {
        expect(vm.$data.cells).to.equal(myCells)
      })

      it('should update width', function () {
        expect(vm.$data.width).to.equal(10)
      })

      it('should update height', function () {
        expect(vm.$data.height).to.equal(10)
      })

      it('should change errorMessage', function () {
        expect(vm.$data.errorMessage).to.equal('Pas d\'erreurs')
      })
    })

    describe('get grid with error', function () {
      beforeEach(function () {
        // given
        promiseCall = sinon.stub(Vue, 'http').returnsPromise()
        myCells = [{ x: '1', y: '1', state: 'alive' }]
        promiseCall.rejects()
        vm = constructAppWithProps(App)

        // when
        vm.refresh()
      })

      xit('should call stopRefreshAuto', function () {
        // expect(vm.$data.errorMessage).to.equal('La Base semble être KO !')
      })

      it('should change errorMessage', function () {
        expect(vm.$data.errorMessage).to.equal('La Base semble être KO !')
      })
    })

    describe('get count of alive cells', function () {

      it('should set numberOfAliveCells to response body', function () {
        // given
        promiseCall = sinon.stub(Vue, 'http').returnsPromise()
        myCells = [{ x: '1', y: '1', state: 'alive' }]
        promiseCall.resolves({
          body: myCells
        })
        promiseCall.resolves({
          body: '88'
        })
        let data = {
          data: {
            numberOfAliveCells: '56'
          }
        }
        vm = constructAppWithProps(App, data)

        // when
        vm.refresh()

        // then
        expect(vm.$data.numberOfAliveCells).to.equal('88')
      })

      it('should NOT set numberOfAliveCells when response body is null', function () {
        // given
        promiseCall = sinon.stub(Vue, 'http').returnsPromise()
        myCells = [{ x: '1', y: '1', state: 'alive' }]
        promiseCall.resolves({
          body: myCells
        })
        promiseCall.resolves({
          body: '0'
        })
        let data = {
          data: {
            numberOfAliveCells: '56'
          }
        }
        vm = constructAppWithProps(App, data)

        // when
        vm.refresh()

        // then
        expect(vm.$data.numberOfAliveCells).to.equal('56')
      })

      describe('when count promise is rejected', function () {
        beforeEach(function () {
          // given
          promiseCall = sinon.stub(Vue, 'http').returnsPromise()
          myCells = [{ x: '1', y: '1', state: 'alive' }]
          promiseCall.resolves({
            body: myCells
          })
          promiseCall.rejects({})
          let data = {
            data: {
              numberOfAliveCells: '56'
            }
          }
          vm = constructAppWithProps(App, data)

          // when
          vm.refresh()
        });

        it('should NOT set numberOfAliveCells ', function () {
          expect(vm.$data.numberOfAliveCells).to.equal('56')
        })

        it('should set error message ', function () {
          expect(vm.$data.errorMessage).to.equal('La Base semble être KO !')
        })

        xit('should call stopRefreshAuto', function () {
          // expect(vm.$data.errorMessage).to.equal('La Base semble être KO !')
        })
      });
    })
  })

  describe('refreshAutomatic', function () {
    it('should setInterval and call refresh', function () {
      // given
      let data = {
        data: {
          idInterval: 'Refresh Auto Not Started'
        }
      }
      vm = constructAppWithProps(App, data)

      // when
      vm.refreshAutomatic()

      // then
      expect(vm.$data.idInterval).to.equal(12)
    })

    // need stub refresh
    xit('state.json setInterval Call', function () {
      this.clock = sinon.useFakeTimers()
      var helper = new state.HELPER()
      var mySpy = sinon.spy(helper, 'fetchState')

      helper.pollStatus(mySpy, '80000', false)
      expect(mySpy.called).to.be.true
      this.clock.tick(80000)
      expect(mySpy.called).to.be.true
    })

    it('should NOT setInterval and call refresh when AutoRefresh already started', function () {
      // given
      let data = {
        data: {
          idInterval: 'id has changed'
        }
      }
      vm = constructAppWithProps(App, data)

      // when
      vm.refreshAutomatic()

      // then
      expect(vm.$data.idInterval).to.equal('id has changed')
    })
  })

  describe('stopRefreshAutomatic', function () {
    // need stub refresh
    xit('should use clearInterval', function () {
      // given
      let data = {
        data: {
          idInterval: 'Refresh Auto Not Started'
        }
      }
      vm = constructAppWithProps(App, data)

      // when
      vm.refreshAutomatic()
      expect(vm.$data.idInterval).to.equal(5)
      vm.stopRefreshAutomatic()

      // then
      expect(vm.$data.idInterval).to.equal('something')
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
