module.exports = function () {
  return function * (next) {
    try {
      yield next
      if (this.status === 404) {
        this.throw(404)
      }
    } catch (error) {
      this.status = error.status || 500
      this.body = {
        message: error.message,
        status: 'ERROR'
      }
      return
    }
  }
}
