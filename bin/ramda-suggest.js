#! /usr/bin/env node
const suggest = require('../src')
const parseArg = (arg) => {
  try {
    return JSON.parse(arg)
  } catch (e) {
    try {
      // Eval is used here to easily cast data types, eslint can shutup
      // eslint-disable-next-line
      return eval(arg)
    } catch (e) { return arg.toString() }
  }
}

// Need to pre process the inputs to cast them into their actual types?
let [ output, ...inputs ] = process.argv.slice(2).reverse().map(parseArg)
inputs = inputs.reverse()

suggest(inputs, output)
