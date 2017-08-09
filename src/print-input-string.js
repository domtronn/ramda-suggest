const { cond, is, compose, map, join, T, toString } = require('ramda')
const { fromCharCode: char } = String

// Text formatters
const formatArgs = (arg, i) => `${char(i + 97)}: ${arg}`
const formatPred = cond([
  [is(Function), toString],
  [is(Object), ({ args, ret }) => `(${args.map(formatArgs)}) => ${ret}`],
  [T, JSON.stringify]
])

module.exports = compose(join(', '), map((input) => formatPred(input)))
