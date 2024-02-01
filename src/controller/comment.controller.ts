import { Request, Response } from "express";
import Comment from "../models/Comments";

export const addComment = async (req: Request, res: Response) => {
  const authenticateduser = res.locals.user;
  try {
    if (!authenticateduser) {
      return res.status(403).json({ message: "Authentication required" });
    }

    const newComment = new Comment({
      post: req.body.post,
      user: res.locals.user.userId,
      content: req.body.content,
    });

    const savedComment = await newComment.save();
    res.status(201).json(savedComment);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getComment = async (req: Request, res: Response) => {
  try {
    const comments = await Comment.find({ post: req.params.postId }).exec();
    res.json(comments);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateComment = async (req: Request, res: Response) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    const authenticateduser = res.locals.user;

    if (!comment) {
      return res.status(404).json({ message: "No comments found" });
    }

    if (comment.user.toString() !== authenticateduser.userId) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this comment" });
    }

    comment.content = req.body.content;
    const updatedComment = await comment.save();

    res.json(updatedComment);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteComment = async (req: Request, res: Response) => {
  try {
    const comment = await Comment.findById(req.params.commentId);

    const authenticateduser = res.locals.user;

    if (!comment) {
      return res.status(404).json({ message: "No comments found" });
    }

    if (comment.user.toString() !== authenticateduser.userId) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this comment" });
    }

    await Comment.findByIdAndDelete(req.params.commentId);
    res.json({ message: "Comment deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getCommentsOnPost = async (req: Request, res: Response) => {
  try {
    const comments = await Comment.find({ post: req.params.postId });
    res.json(comments);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
