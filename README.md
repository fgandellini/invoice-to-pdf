
# Electronic Invoice to PDF

A CLI tool convert an Italian Electronic Invoice file (XML) to a PDF file, applying a customizable style.

## Prerequisites

This program requires [xsltproc](http://xmlsoft.org/XSLT/xsltproc.html) and [wkhtmltopdf](https://wkhtmltopdf.org/) both installed on your machine. For the installation of these tools, please refer to their documentation.

To ensure you have a working environment, check the versions of the tools with:

```
$ wkhtmltopdf --version
wkhtmltopdf 0.12.2.4

$ xsltproc --version
Using libxml 20903, libxslt 10128 and libexslt 817
xsltproc was compiled against libxml 20903, libxslt 10128 and libexslt 817
libxslt 10128 was compiled against libxml 20903
libexslt 817 was compiled against libxml 20903
```

Very good! You're now ready to install invoice-to-pdf!

## Installation

1. install the cli tool with

```
$ npm install -g invoice-to-pdf
```

2. Create a directory to hold your [custom style](./CUSTOM_STYLES.md)

mettere qualche riferimento a XSLT, e fattura elettronica
dire che tutti gli asset devono essere messi nella dir, la puoi organizzare come vuoi e devi assumete tutto come locale alla dir stessa (= la work directory e' la dir stessa)

3. Set the `INOVOICE_TO_PDF_STYLE` env variable to point to your style directory
```
$ export INOVOICE_TO_PDF_STYLE=/path/to/my/custom/style/dir
```
You can also save this env variable in your `.bashrc` or `.zshrc`.

## Usage

Once the tool is installed and the style is set up, you can run

```
$ invoice-to-pdf my_electronic_invoice.xml
```

This command starts a conversion. The PDF output file `my_electronic_invoice.pdf` will be saved in the same directory of the `my_electronic_invoice.xml` input file (:warning: it will overwite any file with the same name!).

## Options

**Style override**

* `-s, --style: <style_dir_path>`

Overrides the style from the global `INOVOICE_TO_PDF_STYLE` directory with the one found in the directory passed as a argument.

This is useful if you have several clients and you want to apply a different style for each of them.

Example:

```
$ invoice-to-pdf my_electronic_invoice.xml --style ./my/custom/style
```

**Watch mode**

* `-w, --watch`

Watches the (global or overridden) style directory for changes and re-run the conversion.

This is useful when developing a new style. It rebuilds the PDF output every time the style directory changes, this way you have a faster feedback loop for your changes.

Examples:

```
$ invoice-to-pdf my_electronic_invoice.xml --watch # use style from INOVOICE_TO_PDF_STYLE
$ invoice-to-pdf my_electronic_invoice.xml --style ./my/custom/style --watch # use style from ./my/custom/style
```

**Help**

* `-h, --help`

Print the usage and the list of options.

**Version**

* `--version`
  
Print the current version of `invoice-to-pdf`.


## How to write a style for your invoice

TODO

## Why

Italy started using the Electronic Invoice from January 1, 2019, this new invoicing system only works for the Italian companies.
I built this tool because I have a company in Italy but I work (remotely) for a foreign company and I need to send them PDF versions of my invoices.
Surprisingly I was not able to find a good (and cheap) software that let me style the PDF invoices with a custom style, so I wrote `invoice-to-pdf`.