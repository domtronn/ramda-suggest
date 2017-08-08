const { grey, bold } = require('chalk')
const docString = require('./read-doc-string')
const printInput = require('./print-input-string')

module.exports = async (inputs, output, func, i) => {
  const { doc, params, returns, category } = await docString(func)
  const outputString = printInput([output])
  const inputString = printInput(inputs)
  const paramString = params.map(({ type, doc }, i) => bold(` param ${i + 1}: `) + `{${grey(type)}} ${doc}`).join('\n')

  const typestring = `[type:${category}]`
  const invocation = `R.${func}(${inputString})`

  console.log(`${i === 0 ? '' : grey('――――――――――――――――――――――――――――――――――――――――――\n')}
${bold(func)} ${grey(typestring)}  : ${invocation} → ${outputString}

${grey(doc)}

${paramString}
${bold(` returns:`)} ${returns}
`)
}
