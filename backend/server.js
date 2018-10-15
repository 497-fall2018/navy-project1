import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import mongoose from 'mongoose';
import multer from 'multer';
import fs from 'fs';
import path from 'path';

import Comment from './models/comment';

// and create our instances
const app = express();
const router = express.Router();

// set our port to either a predetermined port number if you have set it up, or 3001
const API_PORT = 3001;

//file upload handling
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, '../client/public/pets/');
	},
	filename: function (req, file, cb) {
		//cb(null, file.originalname)
		cb(null, Date.now() + '.png');
	},
});
const upload = multer({ storage: storage });

//db config
// mongoose.connect('mongodb://mmoderwell.com:27018/navy').then(() => console.log('Connected to mongodb.')).catch((e) => {
// 	console.error('Connection to mongodb failed.', e);
// });
mongoose.connect('mongodb://localhost:27017/navy').then(() => console.log('Connected to mongodb.')).catch((e) => {
	console.error('Connection to mongodb failed.', e);
});

// now we should configure the API to use bodyParser and look for JSON data in the request body
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "../client/build")));

app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

// now we can set the route path & initialize the API
router.get('/', (req, res) => {
	res.json({ message: 'Hello, World!' });
});

router.get('/comments', (req, res) => {
	Comment.find((err, comments) => {
		if (err) return res.json({ success: false, error: err });
		return res.json({ success: true, data: comments });
	});
});

router.post('/comments', upload.single('frame'), (req, res) => {
	const comment = new Comment();
	// body parser lets us use the req.body
	const { author, description } = req.body;
	const frame_name = req.file.filename;
	console.log(req.body);
	if (!author || !description || !frame_name) {
		// we should throw an error. we can do this check on the front end
		return res.json({
			success: false,
			error: 'You must provide a name, caption, and image.'
		});
	}
	comment.author = author;
	comment.description = description;
	comment.image = frame_name;
	comment.save(err => {
		if (err) return res.json({ success: false, error: err });
		return res.json({ success: true });
	});
});

router.put('/comments/:commentId', upload.single('frame'), (req, res) => {
	console.log(req.params);
	const { commentId } = req.params;
	if (!commentId) {
		return res.json({ success: false, error: 'No comment id provided' });
	}
	Comment.findById(commentId, (error, comment) => {
		if (error) return res.json({ success: false, error });
		const { author, description } = req.body;
		const frame_name = req.file.filename;
		if (author) comment.author = author;
		if (description) comment.description = description;
		if (frame_name) comment.image = frame_name;
		comment.save(error => {
			if (error) return res.json({ success: false, error });
			return res.json({ success: true });
		});
	});
});

router.delete('/comments/:commentId', (req, res) => {
	const { commentId } = req.params;
	if (!commentId) {
		return res.json({ success: false, error: 'No comment id provided' });
	}
	Comment.remove({ _id: commentId }, (error, comment) => {
		if (error) return res.json({ success: false, error });
		return res.json({ success: true });
	});
});

// Use our router configuration when we call /api
app.use('/api', router);

app.listen(process.env.PORT || API_PORT, () => console.log(`Listening on port ${API_PORT}`));
