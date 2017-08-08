#! /usr/bin/env node
const R = require('ramda')
const docString = require('../src/read-doc-string')

// Need to pre process the inputs to cast them into their actual types?
let [ output, ...inputs ] = process.argv.slice(2).reverse()
inputs = inputs.map(input => /^\[/.test(input) ? input.replace(/[\[\]]/g, '').split(/[, ]+/) : input)

// Separate this into a function that takes a list of inputs and output...
// This way it can be used programatically
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
  .forEach(async ([ name, f ]) => {
    const { doc, params, returns, category } = await docString(name)

    console.log(`${name} [type:${category}] : R.${name}(${inputs.join(', ')}) → ${output}`)
    console.log()
    console.log(doc)
    console.log()
    params.forEach(({ type, doc }, i) => console.log(` param ${i + 1}: {${type}} ${doc}`))
    console.log(` returns: ${returns}`)
  })
