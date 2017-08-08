const docString = require('./read-doc-string')

module.exports = async (inputs, output, func) => {
  const { doc, params, returns, category } = await docString(func)
  const inputString = inputs.map(JSON.stringify).join(', ')
  const paramString = params.map(({ type, doc }, i) => ` param ${i + 1}: {${type}} ${doc}`)

  console.log(`
${func}  [type:${category}] : R.${func}(${inputString}) → ${output}

${doc}

${paramString}
 returns: ${returns}
`)
}
