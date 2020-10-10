var express = require('express');
var router = express.Router();
const cors = require('cors');
const app = express()
const bodyParser = require('body-parser')

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

app.set('view engine', 'jade')

/* GET home page. */
app.get('/', function(req, res, next) {
    res.render('index', {
        title: 'Express'
    });
});

/* GET posts. */
app.get('/posts', function(req, res, next) {
    const posts = [];

    res.send({
        posts: posts
    })
});

const port = 8080;

app.listen(port, function() {
    console.log("Starting server with cors enabled on port " + port);
})

module.exports = router;