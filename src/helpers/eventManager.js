export default {
  name: 'auth',

  stopCallingRefreshAuto (idInterval) {
    clearInterval(idInterval)
  }

}
