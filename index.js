const CsvReadableStream = require('csv-parser')
const fs = require('fs')
const os = require('os')
const path = require('path')

let filePath = path.join(os.homedir(), 'JapaneseExport.csv')

let inputStream = fs.createReadStream(filePath, 'utf8')

var meaning = 0
var ex = 0
var ignore = false
var first = false
var empty = true

inputStream.pipe(CsvReadableStream({ 
  parseNumbers: true,
  parseBooleans: true,
  trim: true
})).on('data', row => {
  if (empty && Object.keys(row).length) {
    first = true
  }

  if (!Object.keys(row).length) {
    empty = true
    ignore = false
  }

  if (empty && Object.keys(row).length) {
    for (let header of Object.keys(row)) {
      if (row[header] == 'Particle' || row[header] == 'Pattern') {
        ignore = true
        empty = false
      } else if(row[header] === 'Meaning') {
        console.log(`i: ${header}  r[header]: ${row[header]}`)
        meaning = header
        empty = false
        first = true
      } else if(row[header] === 'Ex') {
        console.log(`i: ${header}  r[header]: ${row[header]}`)
        ex = header
        empty = false
        first = true
      }
    }
  } else if (!first && !ignore && !empty) {
    console.log(`m:${meaning} e:${ex}`)
    if (row) {
      // console.log(`${JSON.stringify(row)}`)
      // console.log(` word: ${row[0]} ${meaning}: ${row[meaning]}  ${ex}: ${row[ex]}`)
      let newWord = {
        word: row[0],
        meaning: row[meaning],
        ex: row[ex]
      }

      console.log(`${JSON.stringify(newWord)}`)
    }
  } else {
    first = false
  }

})