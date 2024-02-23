const fs = require('fs')
const CSV = require('csv-string')
const filepath = './test.csv'

const fetchKeys = (pathToCsv, callback) => {
  const readStream = fs.createReadStream(pathToCsv)
  let keys = []
  readStream.on('data', (chunk) => {
    let header = ''
    let isFirstChunk = true
    let firstChunk = ''
    if (isFirstChunk) {
      firstChunk += chunk.toString()
      const firstLineIndex = firstChunk.indexOf('\n')
      if (firstLineIndex !== -1) {
        header = firstChunk.substring(0, firstLineIndex)
        const delimeter = CSV.detect(header)
        keys = header.split(`${delimeter}`)
        readStream.destroy()
        isFirstChunk = false
        callback(keys, delimeter)
      }
    }
  })
  readStream.on('error', (error) => {
    callback(error)
  })
}

csvToJson(filepath)
async function csvToJson(pathToCsv) {
  const readStream = fs.createReadStream(pathToCsv)
  const writeStream = fs.createWriteStream('output.json')
  let unProcessedData = ''
  let headerKeys = []
  let jsonObjectArray = []

  fetchKeys(pathToCsv, (keys, delimeter, error) => {
    if (error) console.log(error)
    headerKeys = keys.map((key) => key.trim())
    let keysObject = headerKeys.reduce((accummulator, value) => {
      return { ...accummulator, [value]: '' }
    }, {})
    readStream.on('data', (chunk) => {
      let chunkString = unProcessedData + chunk.toString()
      unProcessedData = ''
      let startIndex = 0
  
      for (let i = 0; i < chunkString.length; i++) {
        if (chunkString[i] === '\n') {
          const line = chunkString.slice(startIndex, i).split(`${delimeter}`)
          Object.keys(keysObject).forEach((key, value)=>{
            keysObject[key] = line[value].trim()
          })
          jsonObjectArray.push(keysObject)
          startIndex = i + 1
        }
      }

      if (chunkString[chunkString.length - 1] !== '\n')
        unProcessedData = chunkString.slice(startIndex)
    });

    readStream.on('end', ()=> {
      let dataToStore = JSON.stringify(jsonObjectArray, null, 2)
      writeStream.write(dataToStore)
      console.log("Successfully converted csv file to json file!")
    })

    readStream.on('error', (error)=>{
      console.log("error", error)
    })

  })
}
