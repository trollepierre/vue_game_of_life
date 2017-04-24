export default {
  name: 'auth',

  stopCallingRefreshAuto (idInterval) {
    clearInterval(idInterval)
  },

  setIntervalRefresh (refresh) {
    setInterval(refresh, 1000)
  }

}
