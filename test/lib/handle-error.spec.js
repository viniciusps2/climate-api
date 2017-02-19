const {expect} = require('chai')
const handleError = require('../../lib/handle-error')

describe('handle-error middleware spec', () => {
  it('shold call next middleware', function * () {
    let middleware = handleError()
    let nextCalled
    function * next (e) {
      nextCalled = true
    }
    yield middleware(next)
    expect(nextCalled).to.be.true
  })

  it('shold show friendly error', function * () {
    const ctx = {}
    let middleware = handleError()
    let nextCalled
    function * next (e) {
      nextCalled = true
      throw new Error('Message')
    }
    yield middleware.call(ctx, next)
    expect(nextCalled).to.be.true
    expect(ctx.status).to.be.eq(500)
    expect(ctx.body.message).to.be.eq('Message')
    expect(ctx.body.status).to.be.eq('ERROR')
  })
})
