const { grey, bold } = require('chalk')
const docString = require('./read-doc-string')
const printInput = require('./print-input-string')

const boldenWords = (str) => str.replace(/`(.+?)`/g, (_, word) => bold(word))
const unlinkWords = (str) => str.replace(/\[(.+?)\]\(.*?\)/g, (_, word) => bold(word))

const format = (str) => boldenWords(unlinkWords(str))

module.exports = async (inputs, output, func, i) => {
  const { doc, params, returns, category, signature } = await docString(func)
  const outputString = printInput([output])
  const inputString = printInput(inputs)

  const paramString = params.map(({ type, doc }, i) => bold(` param ${i + 1}: `) + `{${grey(type)}} ${doc}`).join('\n')
  const returnString = returns.replace(/\{(.+?)\}/g, (_, type) => bold(' returns:') + ` {${grey(type)}}`)

  const typestring = `[category:${category}]`
  const invocation = `R.${func}(${inputString})`

  return `${i === 0 ? '' : grey('――――――――――――――――――――――――――――――――――――――――――\n')}
${bold(func)} ${grey(typestring)}

    R: ${grey.italic(invocation)} → ${grey.italic(outputString)}
    λ: ${grey.italic(signature.replace(/->/g, '→'))}

${grey(format(doc))}

${format(paramString)}
${format(returnString)}
`
}
