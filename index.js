const dotenv = require('dotenv')
dotenv.config()

const CsvReadableStream = require('csv-parser')
const fs = require('fs')
const os = require('os')
const path = require('path')

let filePath = path.join(os.homedir(), process.env.WORD_FILE)

let inputStream = fs.createReadStream(filePath, 'utf8')

var newWords = []
var meaning = 0
var ex = 0
var ignore = false
var first = false
var empty = true

const ignoredHeaders = [
  'Particle',
  'Pattern',
  'Ending',
  'Temporal',
  'Counter',
  'Conj',
  'Kanji'
]

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
      if (!ignoredHeaders.includes(row[header])) {
        ignore = true
        empty = false
      } else if(row[header] === 'Meaning') {
        meaning = header
        empty = false
        first = true
      } else if(row[header] === 'Ex') {
        ex = header
        empty = false
        first = true
      }
    }
  } else if (!first && !ignore && !empty) {
    if (row) {
      newWords.push({
        word: row[0],
        meaning: row[meaning],
        ex: row[ex]
      })
    }
  } else {
    first = false
  }
}).on('end', () => {
  fs.writeFile('src/words.json', JSON.stringify(newWords), err => err ? console.log(err) : null)
})
