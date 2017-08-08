#! /usr/bin/env node
const suggest = require('../src')

// Need to pre process the inputs to cast them into their actual types?
// Eslint can fuck off
// eslint-disable-next-line
let [ output, ...inputs ] = process.argv.slice(2).reverse().map(eval)
inputs = inputs.reverse()

suggest(inputs, output)
