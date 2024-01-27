import express from 'express';
import {createWriteStream} from 'node:fs'
import bodyParser from 'body-parser';
const output = createWriteStream('output.ndjson');



const app = express();
app.use(bodyParser.json());

const PORT = 3000;

app.post('/', async(req, res)=>{
    console.log("Recieved!!!", req.body);
    output.write(JSON.stringify(req.body)+"\n");
    return res.send('Ok!!')
})

app.listen(PORT, ()=>console.log(`Listening on port: ${PORT}`))