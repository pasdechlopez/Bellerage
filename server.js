const express = require('express');
const app = express();
let fs = require("fs");
    sys = require("util");
    path  = require("path");
    port = 3000;
let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
app.use(express.urlencoded());

app.use('/files', express.static('files'));

app.get('/', function(req, res) {
    res.sendFile("C:/Users/d.kravtcov/Desktop/AJAX/files/selector.html");
});



app.listen(port, () => console.log(`Example app listening on port ${port}!`))