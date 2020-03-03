const express = require('express');
const app = express();
const  Joi = require('joi'); //возвращает класс - имя классы пишется с большой буквы 
const courses = [
    {id: 1, name: 'course1'},
    {id: 2, name: 'course2'},
    {id: 3, name: 'course3'}
];
let fs = require("fs");
    sys = require("util");
    path  = require("path");
    port = 3001;
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var xhttp = new XMLHttpRequest();

app.get('/', (req, res) => res.send("HELLO!"));

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

app.get('api/courses/:id', (res, req) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send('Not found');
    res.send(course); //404 
});

app.get('/main', function(req, res) {
    res.sendFile("C:/Users/d.kravtcov/Desktop/AJAX/main.html");
});

app.get('/assets/:stylesheetName', function(req, res) {
    res.sendFile("C:/Users/d.kravtcov/Desktop/AJAX/style.css");
});
app.get('/javascript/:JS', function(req, res) {
    res.sendFile("C:/Users/d.kravtcov/Desktop/AJAX/main.js");
});
app.use(express.urlencoded());

app.post('/main', (req, res) => {
    const {
        username,
        message
    } = req.body; 
    console.log(username);
    console.log(message);
    res.send('hello world');

    res.write(JSON.stringify(anObject));

});

app.use(express.urlencoded());

app.use('/pics', express.static('pics'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`))