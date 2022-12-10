const express = require('express')
//const dotenv = require('dotenv')
//const cors = require('cors')

//for the HTTPS implementation
const https = require('https')
const path = require('path')    //to get path of files
const fs = require('fs')        //for file handeling

const app = express();

const PORT = 5000;


//create an SSL server
const sslServer = https.createServer({
    //key of the certificate
    key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),             //sync file reading is used here because this file is essntial for the server to start
    //certificate
    cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem'))
},app)

sslServer.listen(PORT, () => console.log(`Secure server on port ${PORT}`))