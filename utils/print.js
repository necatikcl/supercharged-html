const chalk = require('chalk');

const colors = {
  error: 'red',
  success: 'green',
  info: 'blue'
}

const icons = {
  info: 'âšī¸ ',
  success: 'â',
  error: 'â'
}

const print = ({ type, content }) => {
  const color = colors[type]

  console.log(
    icons[type],
    chalk[color + 'Bright'](content)
  )
}

module.exports = print