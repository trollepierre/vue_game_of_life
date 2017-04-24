import eventManager from '../../../src/helpers/eventManager.js'

it('checks sanity', () => {
  let idInterval = 1234
  eventManager.stopCallingRefreshAuto(1234)
  expect(eventManager.stopCallingRefreshAuto(1234)).to.be.defined
})