import Vue from 'vue'
import VueResource from 'vue-resource'
import App from 'src/App'
import eventManager from '../../../src/helpers/eventManager.js'

Vue.use(VueResource)

function constructAppWithProps (App, data) {
  data = data || {}
  const Constructor = Vue.extend(App)
  return new Constructor(data).$mount()
}

describe('App.vue', () => {
  let vm, bandeau, baseUrl
  beforeEach(function () {
    baseUrl = 'https://glacial-hamlet-53356.herokuapp.com/'
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
        const data = {
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

      it('should call new create when it reacts on click', () => {
        // given
        let boutonCreateElement = vm.$el.querySelector('button.button-create')
        let promiseCall
        promiseCall = sinon.stub(Vue, 'http').returnsPromise()
        promiseCall.rejects()

        // when
        let event = new Event('click')
        boutonCreateElement.dispatchEvent(event)

        // then
        expect(vm.$data.errorMessage).to.equal('Le get newCreate/100/height/50/width/100 est en échec')

        // after
        Vue.http.restore()
      })
    })

    describe('command container', function () {
      let promiseCall
      beforeEach(function () {
        promiseCall = sinon.stub(Vue, 'http').returnsPromise()
        promiseCall.rejects()
      })

      afterEach(function () {
        Vue.http.restore()
      })

      it('should contain a commandContainer inside bandeau', () => {
        expect(bandeau.querySelector('#commandContainer')).not.to.be.empty
      })

      it('should call refresh when it reacts on click', () => {
        let refreshButton = vm.$el.querySelector('button.button-refresh')

        // when
        let event = new Event('click')
        refreshButton.dispatchEvent(event)

        // then
        expect(vm.$data.counter).to.equal(1)
      })

      it('should call refreshAuto when it reacts on click', () => {
        // given
        let refreshAutoButton = vm.$el.querySelector('button.button-refresh-automatic')

        // when
        let event = new Event('click')
        refreshAutoButton.dispatchEvent(event)

        // then
        expect(vm.$data.idInterval >= 0).to.be.true
      })

      it('should call stopRefreshAuto when it reacts on click', () => {
        // given
        let stopButton = vm.$el.querySelector('button.button-stop')

        // when
        let event = new Event('click')
        stopButton.dispatchEvent(event)

        // then
        expect(vm.$data.idInterval).to.equal('Refresh Auto Not Started')
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
      expect(vm.$data.baseUrl).to.equal(baseUrl)
      expect(vm.$data.errorMessage).to.equal('Pas d\'erreurs')
    })
  })

  describe('created', function () {
    xit('should add event listener', function () {
      // when
      let event = new Event('keyup', 'ArrowRight')
      vm.$el.dispatchEvent(event)

      // then
      expect(vm.$data.counter).to.equal(1)

      // => extraire checkKey dans eventManager
    })
  })

  describe('checkKey', function () {
    it('should call newCreate if c', function () {
      // given
      let promiseCall = sinon.stub(Vue, 'http').returnsPromise()
      let myCells = [{ x: '1', y: '1', state: 'alive' }]
      promiseCall.resolves({
        body: myCells
      })
      vm = constructAppWithProps(App)

      let e = {}
      e.key = 'c'

      // when
      vm.checkKey(e)

      // then
      expect(promiseCall).to.have.been.calledWith({
        method: 'get',
        url: `${baseUrl}newCreate/100/height/500/width/1000`
      })

      // after
      Vue.http.restore()
    })

    describe('should call stopRefreshAuto on', function () {
      it('Escape', function () {
        // given
        let data = {
          data: {
            idInterval: 'id has changed'
          }
        }
        vm = constructAppWithProps(App, data)
        let e = {}
        e.key = 'Escape'

        // when
        vm.checkKey(e)

        // then
        expect(vm.$data.idInterval).to.equal('Refresh Auto Not Started')
      })

      it('s', function () {
        // given
        let data = {
          data: {
            idInterval: 'id has changed'
          }
        }
        vm = constructAppWithProps(App, data)

        let e = {}
        e.key = 's'

        // when
        vm.checkKey(e)

        // then
        expect(vm.$data.idInterval).to.equal('Refresh Auto Not Started')
      })
    })

    describe('should call refreshAuto on', function () {
      it('Enter', function () {
        // given
        let e = {}
        e.key = 'Enter'

        // when
        vm.checkKey(e)

        // then
        expect(vm.$data.idInterval >= 0).to.be.true
      })
      it('a', function () {
        // given
        let e = {}
        e.key = 'a'

        // when
        vm.checkKey(e)

        // then
        expect(vm.$data.idInterval >= 0).to.be.true
      })
    })

    describe('should call refresh on', function () {
      let promiseCall, myCells, e
      beforeEach(function () {
        promiseCall = sinon.stub(Vue, 'http').returnsPromise()
        myCells = { x: '1', y: '1', state: 'alive' }
        promiseCall.resolves({
          body: {
            cells: [myCells]
          }
        })
        e = {}
      })

      afterEach(function () {
        Vue.http.restore()
      })

      it('key ArrowRight', function () {
        // given
        e.key = 'ArrowRight'

        // when
        vm.checkKey(e)

        // then
        expect(vm.$data.counter).to.equal(1)
      })

      it('key r', function () {
        // given
        e.key = 'r'

        // when
        vm.checkKey(e)

        // then
        expect(vm.$data.counter).to.equal(1)
      })
    })
  })

  describe('newCreate', function () {
    let promiseCall, myCells

    afterEach(function () {
      Vue.http.restore()
    })

    describe('when dimensions are fake, it should call promise with perfect data', function () {
      beforeEach(function () {
        // given
        promiseCall = sinon.stub(Vue, 'http').returnsPromise()
        myCells = [{ x: '1', y: '1', state: 'alive' }]
        promiseCall.resolves({
          body: myCells
        })
        vm = constructAppWithProps(App)
      })

      it('when width is empty', function () {
        // given
        let dimension = {
          width: '',
          height: '45'
        }

        // when
        vm.newCreate(dimension)

        // then
        expect(promiseCall).to.have.been.calledWith({
          method: 'get',
          url: `${baseUrl}newCreate/100/height/50/width/100`
        })
      })

      it('when width is null', function () {
        // given
        let dimension = {
          width: '0',
          height: '45'
        }

        // when
        vm.newCreate(dimension)

        // then
        expect(promiseCall).to.have.been.calledWith({
          method: 'get',
          url: `${baseUrl}newCreate/100/height/50/width/100`
        })
      })

      it('when height is empty', function () {
        // given
        let dimension = {
          width: '123',
          height: ''
        }

        // when
        vm.newCreate(dimension)

        // then
        expect(promiseCall).to.have.been.calledWith({
          method: 'get',
          url: `${baseUrl}newCreate/100/height/50/width/100`
        })
      })

      it('when height is null', function () {
        // given
        let dimension = {
          width: '45',
          height: '0'
        }

        // when
        vm.newCreate(dimension)

        // then
        expect(promiseCall).to.have.been.calledWith({
          method: 'get',
          url: `${baseUrl}newCreate/100/height/50/width/100`
        })
      })
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

        let dimension = {
          width: 123,
          height: 45
        }

        // when
        vm.newCreate(dimension)
      })

      it('should call promise with correct url', function () {
        expect(promiseCall).to.have.been.calledWith({
          method: 'get',
          url: `${baseUrl}newCreate/100/height/45/width/123`
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

        let dimension = {
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

    /* describe('get count of alive cells', function () {
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
     })

     it('should NOT set numberOfAliveCells ', function () {
     expect(vm.$data.numberOfAliveCells).to.equal('56')
     })

     it('should set error message ', function () {
     expect(vm.$data.errorMessage).to.equal('La Base semble être KO !')
     })

     xit('should call stopRefreshAuto', function () {
     // expect(vm.$data.errorMessage).to.equal('La Base semble être KO !')
     })
     })
     }) */
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
          url: `${baseUrl}grids/100`
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
        })

        it('should NOT set numberOfAliveCells ', function () {
          expect(vm.$data.numberOfAliveCells).to.equal('56')
        })

        it('should set error message ', function () {
          expect(vm.$data.errorMessage).to.equal('La Base semble être KO !')
        })

        xit('should call stopRefreshAuto', function () {
          // expect(vm.$data.errorMessage).to.equal('La Base semble être KO !')
        })
      })
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
      expect(vm.$data.idInterval >= 0).to.be.true
    })

    // need stub refresh
    xit('state.json setInterval Call', function () {
      this.clock = sinon.useFakeTimers()
      let helper = new state.HELPER()
      let mySpy = sinon.spy(helper, 'fetchState')

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
    it('should call event manager', function () {
      // given
      let mySpy = sinon.spy(eventManager, 'stopCallingRefreshAuto')
      vm = constructAppWithProps(App)

      // when
      vm.stopRefreshAutomatic()

      // then
      expect(mySpy.called).to.be.true
    })

    it('should reset id interval', function () {
      // given
      let data = {
        data: {
          idInterval: 'id has changed'
        }
      }
      vm = constructAppWithProps(App, data)

      // when
      vm.stopRefreshAutomatic()

      // then
      expect(vm.$data.idInterval).to.equal('Refresh Auto Not Started')
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
