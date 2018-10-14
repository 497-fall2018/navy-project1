import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// create new instance of the mongoose.schema. the schema takes an
// object that shows the shape of your database entries.

const PostsSchema = new Schema({
	name: String, //pet's name
	caption: String, //the images caption
	votes: { type: Number, default: 0 }, //number of votes on post
	comments: [Comment], //array of subdocuments (comments)
}, { timestamps: true });

// export our module to use in server.js
export default mongoose.model('Post', PostsSchema);
