const usage = `Usage
  $ invice-to-pdf [OPTIONS] <invoice.xml>

  Options
    --style, -s  Specify a custom style directory for conversion.
                 This overrides the global INVOICE_TO_PDF_STYLE
                 env variable, if set.
    --watch, -w  Watch mode for style directory.

  Note
    You can set the INVOICE_TO_PDF_STYLE env variable
    to use a global style directory for conversion.
`

const errors = {
  STYLE_NOT_FOUND: `Style directory not found.`,
  INVOICE_NOT_FOUND: `Invoice XML file not found.`,
  TOO_MANY_INVOICE_FILES: `You need to specify exactly one invoice file (XML) to convert.`
}

module.exports = { usage, errors }
