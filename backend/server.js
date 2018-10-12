import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import mongoose from 'mongoose';

import Post from './models/post';

// and create our instances
const app = express();
const router = express.Router();

// set our port to either a predetermined port number if you have set it up, or 3001
const API_PORT = 3001;

// db config
// mongoose.connect('mongodb://mmoderwell.com:27018/navy').then(() => console.log('Connected to mongodb.')).catch((e) => {
//   console.error('Connection to mongodb failed.', e);
// });
mongoose.connect('mongodb://localhost:27017/navy').then(() => console.log('Connected to mongodb.')).catch((e) => {
	console.error('Connection to mongodb failed.', e);
});


// now we should configure the API to use bodyParser and look for JSON data in the request body
app.use(bodyParser.json());

//route for creating a new post
router.post('/post', (req, res) => {
	const post = new Post();
	// body parser lets us use the req.body
	const { name, caption } = req.body;
	console.log(req.body);
	if (!name || !caption) {
		// we should throw an error. we can do this check on the front end
		return res.json({
			success: false,
			error: 'You must provide an name and caption'
		});
	}
	post.name = name;
	post.comment = comment;
	post.save(err => {
		if (err) return res.json({ success: false, error: err });
		return res.json({ success: true });
	});
});

router.put('/:post_id/comment', (req, res) => {
	console.log(req.params);
	const { post_id } = req.params;
	if (!post_id) {
		return res.json({ success: false, error: 'No post_id provided' });
	}
	Post.findById(post_id, (error, post) => {
		if (error) return res.json({ success: false, error });
		const { author, text } = req.body;
		if (author && text) {
			post.comments.push({ author: author, text: text });
		}
		post.save(error => {
			if (error) return res.json({ success: false, error });
			return res.json({ success: true });
		});
	});
});

// router.get('/comments', (req, res) => {
// 	Comment.find((err, comments) => {
// 		if (err) return res.json({ success: false, error: err });
// 		return res.json({ success: true, data: comments });
// 	});
// });

// router.put('/comments/:commentId', (req, res) => {
// 	console.log(req.params);
// 	const { commentId } = req.params;
// 	if (!commentId) {
// 		return res.json({ success: false, error: 'No comment id provided' });
// 	}
// 	Comment.findById(commentId, (error, comment) => {
// 		if (error) return res.json({ success: false, error });
// 		const { author, text } = req.body;
// 		if (author) comment.author = author;
// 		if (text) comment.text = text;
// 		comment.save(error => {
// 			if (error) return res.json({ success: false, error });
// 			return res.json({ success: true });
// 		});
// 	});
// });

// router.delete('/comments/:commentId', (req, res) => {
// 	const { commentId } = req.params;
// 	if (!commentId) {
// 		return res.json({ success: false, error: 'No comment id provided' });
// 	}
// 	Comment.remove({ _id: commentId }, (error, comment) => {
// 		if (error) return res.json({ success: false, error });
// 		return res.json({ success: true });
// 	});
// });

// Use our router configuration when we call /api
app.use('/api', router);

app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));