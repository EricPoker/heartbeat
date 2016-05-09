'use strict'
const heartbeat = require('..')
const assert = require('assert')
describe('', function () {
  this.timeout(30 * 1000)  
  it('no opts', () => {
    let heart = heartbeat()
    assert(heart.interval === 30)
    assert(heart.timeout === 2)
  })
  it('with opts', () => {
    let opts = {
      interval: 300,
      timeout: 3
    }
    let heart = heartbeat(opts)
    assert(heart.interval === 300)
    assert(heart.timeout === 3)
  })
  it('timeout', (done) => {
    let opts = {
      interval: 5,
      timeout: 1
    }
    let heart = heartbeat(opts)
    heart.on('timeout', () => {
      done()
    })
    heart.start()
  })
})