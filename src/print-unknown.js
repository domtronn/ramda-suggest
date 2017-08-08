const { grey, italic, bold } = require('chalk')
const printInput = require('./print-input-string')

const type = (a) => {
  const [ c, ...rest ] = (typeof a).toString()
  return `${c.toUpperCase() + rest.join('')}`
}

module.exports = (inputs, output) => ([
  Promise.resolve(`
${bold('ramda-suggest:unknown')}
Unable to ${italic('suggest')} a function that satisfies

    R: ${grey.italic(`f(${printInput(inputs)})`)} → ${grey.italic(printInput([output]))}
    λ: ${grey.italic(inputs.map(a => type(a)).join(', '))} → ${grey.italic(type(output))}
  `)
])
