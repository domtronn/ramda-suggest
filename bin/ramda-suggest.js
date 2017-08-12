#! /usr/bin/env node
const { grey, bold } = require('chalk')
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

if (process.argv.length < 3) {
  console.log(`
${bold('ramda-suggest')}: Missing arguments

  Try: ${grey('ramda-suggest input1 input2 output2')}
       ${grey('ramda-suggest true')}
`)
  process.exit(0)
}

// Need to pre process the inputs to cast them into their actual types?
let [ output, ...inputs ] = process.argv.slice(2).reverse().map(parseArg)
inputs = inputs.reverse()

let outputInput, outputReturn

if (/\(.*?\) => .*/.test(`${output}`)) {
  [, outputInput, outputReturn] = /\((.*?)\) => (.*)/.exec(`${output}`)

  const args = outputInput.split(/, ?/).map(parseArg).filter(a => a)
  const ret = parseArg(outputReturn)

  output = { args, ret }
}

suggest(inputs, output)
