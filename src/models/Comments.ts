import mongoose, { Schema, Document } from 'mongoose';

interface IComment extends Document {
    post: mongoose.Schema.Types.ObjectId;
    content: string;
    date: Date;
    user: mongoose.Schema.Types.ObjectId; 
}

const CommentSchema = new mongoose.Schema({
    post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    date: { type: Date, default: Date.now }
})

export default mongoose.model<IComment>('Comment', CommentSchema);
