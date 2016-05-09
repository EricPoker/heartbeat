'use strict'

const EventEmitter = require('events')
const debug = require('debug')('heartbeat')

/**
 * follow num is default if not set
 * opts: {
 *  interval: 30
 *  timeout: 2
 * }
 */
module.exports = (opts) => {
  return new Heartbeat(opts)
}
class Heartbeat extends EventEmitter {
  constructor (opts) {
    super()
    opts = opts || {}
    this.interval  = +opts.interval || 30
    this.timeout = +opts.timeout || 2 
    this.intervalTimer = null
    this.timeoutCurrentCount = 0
    this.timeoutTimer = null
    this.init()
  }
  
  init () {
    this.on('pong', () => {
      this.timeoutCurrentCount = 0
    })
    this.on('ping', () => {
      this.timeoutCurrentCount++
    })
  }
  
  start () {
    this.intervalTimer = setInterval(() => {
      //if timeout count more than setting, emit timeout and stop heartbeat
      debug(`${this.timeoutCurrentCount} ping`)
      if(this.timeoutCurrentCount > this.timeout) {
        this.emit('timeout')
        this.stop()
        return
      }
      this.emit('ping')
    }, this.interval * 1000)
  }
  
  stop () {
    clearInterval(this.intervalTimer)
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