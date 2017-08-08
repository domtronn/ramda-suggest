const R = require('ramda')
const print = require('./print-report')
const printInput = require('./print-input-string')

module.exports = (inputs, output) => {
  const results = Object
    .entries(R) // Get list of all available Ramda functions
    .filter(([name, f]) => f.length === inputs.length) // Match signature length with input length
    .filter(([name, f]) => { // Test function with input and compare to desired output
      try {
        return f.apply({}, inputs) === output
      } catch (ex) { return false }
    })

  results.length
    ? results.forEach(async ([ func ]) => print(inputs, output, func))
    : console.log(`ramda-suggest - Could not suggest a function: f(${printInput(inputs)}) → ${output}`)
}
