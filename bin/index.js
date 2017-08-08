#! /usr/bin/env node
const R = require('ramda')
const [ output, ...inputs ] = process.argv.slice(2).reverse()

// If not output, error
// console.log(inputs, output)

Object
  .entries(R)
  .filter(([name, f]) => f.length === inputs.length)
  .filter(([name, f]) => {
    try {
      // Need non-strict equality for type casting
      // eslint-disable-next-line
      return f.apply({}, inputs) == output
    } catch (ex) { return false }
  })
  .forEach(([ name, f ]) => {
    console.log(`${name}: R.${name}(${inputs.join(',')}) == ${output}`)
  })
