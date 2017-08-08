module.exports = (inputs) => inputs.map(input => {
  return typeof input === 'function'
    ? input.toString()
    : JSON.stringify(input)
}).join(', ')
