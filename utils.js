const fs = require('fs')
const arg = require('arg')
const package = require('./package.json')
const { usage, errors } = require('./messages')

const throwIfNotExists = (path, errorMessage) => {
  if (!fs.existsSync(path)) {
    throw new Error(errorMessage)
  }
}

const validateComandLine = (globalStyleDir) => {
  const args = arg({
    // Types
    '--help': Boolean,
    '--style': String,
    '--watch': Boolean,
    '--version': Boolean,

    // Aliases
    '-h': '--help',
    '-s': '--style',
    '-w': '--watch'
  })

  if (args['--help']) {
    console.log(usage)
    process.exit()
  }

  if (args['--version']) {
    console.log(package.version)
    process.exit()
  }

  if (args['_'].length > 1) {
    throw new Error(errors.TOO_MANY_INVOICE_FILES)
  }

  const invoiceFilePath = args['_'][0]
  const styleDir = args['--style'] || globalStyleDir
  const watchMode = !!args['--watch']

  throwIfNotExists(invoiceFilePath, errors.INVOICE_NOT_FOUND)
  throwIfNotExists(styleDir, errors.STYLE_NOT_FOUND)

  return { invoiceFilePath, styleDir, watchMode}
}

module.exports = { validateComandLine, throwIfNotExists }
