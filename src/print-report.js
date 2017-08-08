const docString = require('./read-doc-string')
const printInput = require('./print-input-string')

module.exports = async (inputs, output, func) => {
  const { doc, params, returns, category } = await docString(func)
  const inputString = printInput(inputs)
  const paramString = params.map(({ type, doc }, i) => ` param ${i + 1}: {${type}} ${doc}`)

  console.log(`
${func}  [type:${category}] : R.${func}(${inputString}) → ${output}

${doc}

${paramString}
 returns: ${returns}
`)
}
