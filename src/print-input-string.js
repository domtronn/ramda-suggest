const { cond, is, prop, both, compose, map, join, T, toString } = require('ramda')
const { fromCharCode: char } = String

// Text formatters
const formatArgs = (arg, i) => `${char(i + 97)}: ${formatPred(arg)}`
const formatPred = cond([
  [is(Function), toString],
  [both(prop('ret'), prop('args')), ({ args, ret }) => `(${[].concat(args).map(formatArgs)}) => ${JSON.stringify(ret)}`],
  [T, JSON.stringify]
])

module.exports = compose(join(', '), map((input) => formatPred(input)))
