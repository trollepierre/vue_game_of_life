import eventManager from '../../../src/helpers/eventManager.js'

describe('stopCallingRefreshAuto', function () {
  it('checks sanity', () => {
    let idInterval = 1234
    expect(eventManager.stopCallingRefreshAuto(idInterval)).to.be.defined
  })
})

describe('setIntervalRefresh', function () {
  it('checks sanity', () => {
    let refresh = ''
    expect(eventManager.setIntervalRefresh(refresh)).to.be.defined
  })
})
