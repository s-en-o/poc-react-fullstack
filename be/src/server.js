import express from 'express';
import { db, connectToDB } from './db.js';

const app = express();
const port = 8000;
// Use Json middleware
app.use(express.json());

// --------------------------------
// API END POINT
// --------------------------------

// - Getting articles by name
app.get('/api/articles/:name', async (req, res) => {
    const { name } = req.params;
    const article = await db.collection('articles').findOne({ name });

    if (!article) return res.sendStatus(404);

    res.json(article);
});

// - Add up vote to an article
app.put('/api/articles/:name/upvote', async (req, res) => {
    const { name } = req.params;

    await db.collection('articles').updateOne(
        { name },
        {
            $inc: {
                upvotes: 1,
            },
        }
    );

    const article = await db.collection('articles').findOne({ name });

    if (article) {
        res.send(`The ${name} article now has ${article.upvotes} upvotes`);
    } else {
        res.send(`That article doesn't exist`);
    }
});

// - Add comment to an article
app.post('/api/articles/:name/comments', async (req, res) => {
    const { name } = req.params;
    const { postedBy, text } = req.body;

    await db.collection('articles').updateOne(
        { name },
        {
            $push: {
                comments: {
                    postedBy,
                    text,
                },
            },
        }
    );

    const article = await db.collection('articles').findOne({ name });

    if (article) {
        res.send(article.comments);
    } else {
        res.send(`That article doesn't exist`);
    }
});

// - Connect to Database and run Express app
connectToDB(() => {
    app.listen(port, () => {
        console.log(`Server is listening in port ${port}`);
    });
});
