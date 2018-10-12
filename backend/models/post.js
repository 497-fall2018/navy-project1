// models/post.js
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// create new instance of the mongoose.schema. the schema takes an
// object that shows the shape of your database entries.
const CommentSchema = new Schema({
	author: String,
	text: String,
	date: { type: Date, default: Date.now },
});

const PostSchema = new Schema({
	name: String,
	caption: String,
	date: { type: Date, default: Date.now },
	votes: { type: Number, defualt: 0 },
	comments: [CommentSchema],

});
//, { timestamps: true });

// export our module to use in server.js
export default mongoose.model('Post', PostSchema);