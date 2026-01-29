
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./aura.cjs.production.min.js')
} else {
  module.exports = require('./aura.cjs.development.js')
}
