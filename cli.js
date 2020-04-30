#!/usr/bin/env node

const watch = require('node-watch')
const { usage } = require('./messages')
const { validateComandLine } = require('./utils')
const { xmlToPdf } = require('./index')

const { INVOICE_TO_PDF_STYLE } = process.env

try {
  const { invoiceFilePath, styleDir, watchMode } = validateComandLine(INVOICE_TO_PDF_STYLE)
  if (watchMode) {
    watch(styleDir, { recursive: true }, (_evt, _name) =>
      xmlToPdf(invoiceFilePath, styleDir)
    )
  } else {
    xmlToPdf(invoiceFilePath, styleDir)
  }
} catch (err) {
  console.log(`Error: ${err.message}\n\n${usage}`)
}
