import logger from 'morgan';
import mongoose from 'mongoose';
import Post from './models/post';
import Comment from './models/comment';
// and create our instances
const app = express();
const router = express.Router();
const API_PORT = 3001;

// db config
mongoose.connect('mongodb://mmoderwell.com:27018/petstagram').then(() => console.log('Connected to mongodb.')).catch((e) => {
	console.error('Connection to mongodb failed.', e);
});

// now we should configure the API to use bodyParser and look for JSON data in the request body
app.use(bodyParser.json());

//for getting all of the posts
router.get('/posts', (req, res) => {
	Post.find((err, posts) => {
		if (err) return res.json({ success: false, error: err });
		return res.json({ success: true, data: posts });
	});
});

// now we can set the route path & initialize the API
router.get('/', (req, res) => {
	res.json({ message: 'Hello, World!' });
});

//for creating a new post
router.post('/posts', (req, res) => {
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
	post.caption = caption;
	post.save(err => {
		if (err) return res.json({ success: false, error: err });
		return res.json({ success: true });
	});
});

//for updating a post
router.put('/posts/:post_id', (req, res) => {
	console.log(req.params);
	const { post_id } = req.params;
	if (!post_id) {
		return res.json({ success: false, error: 'No post_id provided' });
	}
	Post.findById(post_id, (error, post) => {
		if (error) return res.json({ success: false, error });
		const { name, caption } = req.body;
		if (name) post.name = name;
		if (caption) post.caption = caption;
		post.save(error => {
			if (error) return res.json({ success: false, error });
			return res.json({ success: true });
		});
	});
});

//for deleting a post
router.delete('/posts/:post_id', (req, res) => {
	const { post_id } = req.params;
	if (!post_id) {
		return res.json({ success: false, error: 'No post_id provided' });
	}
	Post.remove({ _id: post_id }, (error, post) => {
		if (error) return res.json({ success: false, error });
		return res.json({ success: true });
	});
});

//for adding a new comment to a post
router.post('/posts/:post_id/comment', (req, res) => {
	const { post_id } = req.params;
	const { author, text } = req.body;
	console.log(req.body);
	if (!author || !text) {
		// we should throw an error. we can do this check on the front end
		return res.json({
			success: false,
			error: 'You must provide an author and text'
		});
	}
	Post.findById(post_id, (error, post) => {
		if (error) return res.json({ success: false, error });
		post.comments.push({ author: author, text: text });
		post.save(error => {
			if (error) return res.json({ success: false, error });
			return res.json({ success: true });
		});
	});
});

// Use our router configuration when we call /api
app.use('/api', router);

app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));