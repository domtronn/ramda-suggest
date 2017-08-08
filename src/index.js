const R = require('ramda')
const print = require('./print-report')
const printUnknown = require('./print-unknown.js')

const deepEqual = require('deep-equal')

module.exports = async (inputs, output) => {
  const results = Object
        .entries(R) // Get list of all available Ramda functions
        .filter(([name, f]) => f.length === inputs.length) // Match signature length with input length
        .filter(([name]) => name !== 'unfold')
        .filter(([name, f]) => { // Test function with input and compare to desired output
          try {
            return deepEqual(f.apply({}, inputs), output)
          } catch (ex) { return false }
        })

  const promise = Promise.all(
    results.length
      ? results.map(async ([ func ], i) => print(inputs, output, func, i))
      : printUnknown(inputs, output)
  )

  promise.then(result => console.log(result.join('\n')))
}
