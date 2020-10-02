const dotenv = require('dotenv')
dotenv.config()

const CsvReadableStream = require('csv-parser')
const fs = require('fs')
const os = require('os')
const path = require('path')

let filePath = path.join(os.homedir(), process.env.WORD_FILE)

let inputStream = fs.createReadStream(filePath, 'utf8')

const newWords = []
let meaning = 0
let ex = 0
let ignore = false
let first = false
let empty = true
let typeName = ''

const ignoredHeaders = process.env.IGNORED_HEADERS

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
    typeName = row[0]
    for (let header of Object.keys(row)) {
      if (ignoredHeaders.includes(row[header])) {
        ignore = true
        empty = false
      } else if(row[header] === 'Meaning') {
        meaning = header
        empty = false
        first = true
      } else if(row[header] === 'Example') {
        ex = header
        empty = false
        first = true
      }
    }
  } else if (!first && !ignore && !empty) {
    if (row) {
      newWords.push({
        word: row[0],
        type: typeName,
        meaning: row[meaning],
        example: row[ex]
      })
    }
  } else {
    first = false
  }
}).on('end', () => {
  fs.writeFile('src/words.json', JSON.stringify(newWords), err => err ? console.log(err) : null)
})
