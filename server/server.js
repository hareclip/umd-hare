// server.js
require('dotenv').config();

const express = require('express');
const enforce = require('express-sslify');
const s3Proxy = require('s3-proxy')({
    bucket: process.env.S3_BUCKET_NAME,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    overrideCacheControl: 'max-age=100000',
    defaultKey: 'index.html'
});

const api = require('./routes');

app = express();

if(process.env.NODE_ENV === 'production') {
    app.use(enforce.HTTPS({ trustProtoHeader: true }));
}
app.use('/api', api);
app.get('/static/*', s3Proxy);
app.get('/', s3Proxy);

var port = process.env.PORT || 5000;
app.listen(port);

console.log('server started '+ port);