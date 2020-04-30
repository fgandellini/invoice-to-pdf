# How to define your invoice custom style (WIP)

```
custom-style
├── basscss.min.css    # you can use any CSS libray
├── normalize.css
├── style.css
├── assets             # you can organize your style as you want
    ├── logo.svg
    └── mail-icon.png
└── style.xsl          # this is mandatory
```

you can even load remote fonts, be sure to use the `@IMPORT` syntax:

```
  <!-- in style.xsl -->
  <style>
    @import url('https://fonts.googleapis.com/css?family=Dosis:200,300,400,500,600,700,800');
  </style>
```

you can import icon fonts

the fonts referenced by your style must be installed in your system.

you need to have a style.xsl in the root forlder of your style

fonts
http://blog.shaharia.com/use-google-web-fonts-for-wkhtmltopdf-tools-to-convert-html-to-pdf

1. get your ttf font (if you use google Fonts, you can download the zip file) 
2. load the ttf files to https://www.fontsquirrel.com/tools/webfont-generator
3. select Expert mode
4. flag the
  * TrueType
  * WOFF
  * Base64 Encode
  * Style link
5. tweak other settings, if needed
6. download the css file and import it in style.xsl


make-face