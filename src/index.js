const R = require('ramda')

const print = require('./print-report')
const printUnknown = require('./print-unknown.js')

const deepEqual = require('deep-equal')

module.exports = async (inputs, output) => {
  const results = Object
        // Get list of all available Ramda functions
        .entries(R)
        // Match signature length with input length, ignoring compose functions
        .filter(([name, f]) => /compose/.test(name) || f.length === inputs.length)
        // Unfold seems to cause stack trace problems...
        .filter(([name]) => name !== 'unfold')
        .filter(([name, f]) => { // Test function with input and compare to desired output
          try {
            let result = f.apply({}, inputs)

            return (typeof result === 'function' && typeof output === 'object')
              ? deepEqual(result.apply({}, output.args), output.ret)
              : deepEqual(result, output)
          } catch (ex) { return false }
        })

  Promise.all(
    results.length
      ? results.map(async ([ func ], i) => print(inputs, output, func, i))
      : printUnknown(inputs, output)
  ).then(result => console.log(result.join('\n')))
}
