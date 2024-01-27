import {createReadStream} from 'node:fs'
import { pipeline } from 'node:stream/promises'



await pipeline(createReadStream('big.csv'),
async function * (source){
  for await (const data of source){
    console.log('data', data.toString())
  }
})