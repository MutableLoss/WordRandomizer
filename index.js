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

const ignoredHeaders = process.env.IGNORED_HEADERS.split(',')

inputStream.pipe(CsvReadableStream({ 
  parseNumbers: true,
  parseBooleans: true,
  trim: true
})).on('data', row => {
  const keyList = Object.keys(row)

  if (empty && keyList.length > 1) {
    first = true
  }

  if (!keyList.length) {
    empty = true
    ignore = false
  }

  if (empty && keyList.length > 1) {
    typeName = row[0]
    for (let header of keyList) {
      if (ignoredHeaders.includes(row[header])) {
        ignore = true
        empty = false
      } else if(row[header] == 'Meaning') {
        meaning = header
        empty = false
        first = true
      } else if(row[header] == 'Example') {
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
