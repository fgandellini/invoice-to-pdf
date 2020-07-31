const os = require('os')
const path = require('path')
const fs = require('fs-extra')
const { execSync } = require('child_process')

const TEMP_DIR_PREFIX = 'invoice-to-pdf-'

const XML_TO_HTML_CMD = 'xsltproc --output invoice.html style.xsl invoice.xml'

// --enable-local-file-access comes from https://github.com/wkhtmltopdf/wkhtmltopdf/issues/2660
const HTML_TO_PDF_CMD = 'wkhtmltopdf --enable-local-file-access --margin-top 0 --margin-left 0 --margin-bottom 0 --margin-right 0 invoice.html invoice.pdf'

const xmlToPdf = (xmlFilePath, styleDir) => {
  let tmpDir = null 
  try {
  // abs path of the input XML file
  const xmlFile = path.resolve(xmlFilePath)

  // create a temporary directory to store all the assets for processing
  tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), TEMP_DIR_PREFIX))

  // temp file paths
  const tmpXmlFile = path.join(tmpDir, 'invoice.xml')
  const tmpPdfFile = path.join(tmpDir, 'invoice.pdf')

  // output PDF file path
  const { dir, name } = path.parse(xmlFile)
  const pdfFile = path.join(dir, `${name}.pdf`)

  // recursively copy the content of the style directory in the temporary directory
  fs.copySync(styleDir, tmpDir)

  // copy the input file in the temporary directory
  console.log(`Loading invoice ${name}.xml...`)
  fs.copySync(xmlFile, tmpXmlFile)

  // convert invoice file, applying style
  console.log('Applying style...')
  execSync(XML_TO_HTML_CMD, { cwd: tmpDir })

  console.log(`Printing to ${name}.pdf...`)
  execSync(HTML_TO_PDF_CMD, { cwd: tmpDir, stdio: 'ignore' })
  
  // copy the temporay pdf file back to xmlFile directory
  fs.copySync(tmpPdfFile, pdfFile)

  // remove the temporary directory
  fs.removeSync(tmpDir)

  console.log('Done')

  } catch(err) {

    // remove the temporary directory in case of errors during conversion
    if (tmpDir !== null) {
      fs.removeSync(tmpDir)
    }

    console.error('Errors during conversion.')
    console.error(err)
  }
}

module.exports = { xmlToPdf }
