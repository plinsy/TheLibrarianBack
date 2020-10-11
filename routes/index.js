const {
    ValidationError
} = require('express')
var express = require('express');
var router = express.Router();
const cors = require('cors');
const app = express()
const bodyParser = require('body-parser')
const Post = require("./../models").Post;

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

app.set('view engine', 'jade')

/* GET home page. */
app.get('/', function(req, res, next) {
    res.render('index', {
        title: 'TheBlog DB'
    });
});

/* GET posts. */
app.get('/posts', async function(req, res, next) {
    const posts = await Post.findAll({});

    res.send(posts)
});

/* POST posts. */
app.post('/posts', async function(req, res, next) {
    const post = req.body;

    try {
        const newPost = await Post.build({
            title: post.title,
            content: post.content,
        })

        // waiting for post validation
        await newPost.validate()

        // save new post
        await newPost.save()

        res.send(newPost)
    } catch (e) {
        if (e instanceof ValidationError) {
            return console.error('Validation error : ' + e.errors[0].message);
        }

        res.send(e)

        console.error(e);
    }
});

// UPDATE post
app.patch("/posts/:id/update", async (req, res, next) => {
    const postId = req.params.id;
    const postData = req.body;

    try {
        const postToUpdate = await Post.findByPk(postId)

        await postToUpdate.update(postData)

        const posts = await Post.findAll({})

        res.send(posts)
    } catch (e) {
        console.error(e);
        res.send(e)
    }
})

// DELETE post
app.delete("/posts/:id/destroy", async (req, res, next) => {
    const postId = req.params.id;

    try {
        const postToUpdate = await Post.findByPk(postId)

        await postToUpdate.destroy()

        const posts = await Post.findAll({})

        res.send(posts)
    } catch (e) {
        console.error(e);
        res.send(e)
    }
})

const port = 8080;

app.listen(port, function() {
    console.log("Starting server with cors enabled on port " + port);
})

module.exports = router;