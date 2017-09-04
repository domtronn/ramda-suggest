const R = require('ramda')

const print = require('./print-report')
const printUnknown = require('./print-unknown.js')

const deepEqual = require('deep-equal')

module.exports = async (inputs, output) => {
  const results = Object
  // Get list of all available Ramda functions
        .entries(R)
  // Match signature length with input length
  // Keep compose functions and remove unfold
        .filter(([name, f]) => {
          if (name === 'unfold') return false
          if (/compose/.test(name)) return true
          return f.length === inputs.length
        })
  // Test function with input and compare to desired output
        .filter(([name, f]) => {
          try {
            let result = f.apply({}, inputs)

            return (typeof result === 'function' && typeof output === 'object')
              ? deepEqual(result.apply({}, output.args), output.ret)
              : deepEqual(result, output)
          } catch (ex) { return false }
        })

  const promise = results.length
        ? Promise.all(results.map(async ([ func ], i) => print(inputs, output, func, i))).then()
        : printUnknown(inputs, output)

  
  
  promise.then(result => console.log(result.join('\n')))
}
