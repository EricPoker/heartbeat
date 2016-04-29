'use strict'

const EventEmitter = require('events')

/**
 * follow num is default if not set
 * opts: {
 *  interval: 30
 * }
 */
module.exports = (opts) => {
  return new Heartbeat(opts)
}
class Heartbeat extends EventEmitter {
  constructor (opts) {
    opts = opts || {}
    this.interval  = +opts.interval || 30
    this.timer = null
  }
  
  start () {
    let heartbeat = this
    this.timer = setInterval(() => {
      heartbeat.emit('ping')
    }, this.interval * 1000)
  }
  
  stop () {
    clearInterval(this.timer)
  }
  
  restart () {
    this.stop()
    this.start
  }
  
  changeInterval (interval) {
    if(isNaN(interval) || interval < 1) {
      throw new TypeError('interval is NaN or less than 1')
    }
    this.interval = interval
    this.restart()
  }
}