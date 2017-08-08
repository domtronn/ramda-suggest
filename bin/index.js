#! /usr/bin/env node
const suggest = require('../src')

// Need to pre process the inputs to cast them into their actual types?
let [ output, ...inputs ] = process.argv
    .slice(2)
    .reverse()
    .map(s => {
      try {
        // Eval is used here to easily cast data types, eslint can shutup
        // eslint-disable-next-line
        return eval(s)
      } catch (e) {
        try {
          return JSON.parse(s)
        } catch (e) { return s }
      }
    })

inputs = inputs.reverse()

suggest(inputs, output)
