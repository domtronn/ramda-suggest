const docString = require('./read-doc-string')
const printInput = require('./print-input-string')

module.exports = async (inputs, output, func) => {
  const { doc, params, returns, category } = await docString(func)
  const outputString = printInput([output])
  const inputString = printInput(inputs)
  const paramString = params.map(({ type, doc }, i) => ` param ${i + 1}: {${type}} ${doc}`).join('\n')

  console.log(`
${func}  [type:${category}] : R.${func}(${inputString}) → ${outputString}

${doc}

${paramString}
 returns: ${returns}
`)
}
