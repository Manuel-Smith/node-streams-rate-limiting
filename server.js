import express from 'express';
import {createWriteStream} from 'node:fs'
import bodyParser from 'body-parser';
import rateLimit from 'express-rate-limit';
const output = createWriteStream('output.ndjson');


const limiter = rateLimit({
    windowMs: 1000, // every second
    max: 3, // Limit each Ip to 100 requests per `Window` (here, per second)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

const app = express();
app.use(bodyParser.json());
app.use(limiter);

const PORT = 3000;

app.post('/', async(req, res)=>{
    console.log("Recieved!!!", req.body);
    output.write(JSON.stringify(req.body)+"\n");
    return res.send('Ok!!')
})

app.listen(PORT, ()=>console.log(`Listening on port: ${PORT}`))