import { Request, Response } from "express";
import Post, { IPost } from "../models/Posts"; 

export const createPost = async (
  req: Request<{}, {}, IPost>,
  res: Response
) => {
  try {
    const { title, content, createdAt } = req.body;
    const author = res.locals.user.username;

    if (!author) {
      return res.status(403).json({ message: "Authentication required" });
    }

    const newPost = new Post({ title, content, author, createdAt });
    const savedPost = await newPost.save();
    res.status(201).json(savedPost); 
    } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getPost = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json(post);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updatePost = async (
  req: Request<{ id: string }, {}, IPost>,
  res: Response
) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).json({ message: "Post to update not found" });
    }
    res.json(updatedPost);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deletePost = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post to delete not found" });
    }
    res.json({ message: "Post successfully deleted" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getPosts = async (req: Request, res: Response): Promise<void> => {
  try {
    let page = parseInt(req.query.page as string) || 1;
    let perPage = parseInt(req.query.perPage as string) || 10;

    const totalPosts: number = await Post.countDocuments();
    const posts: IPost[] = await Post.find()
                                     .skip((page - 1) * perPage)
                                     .limit(perPage);

    res.json({
      currentPage: page,
      perPage: perPage,
      totalPosts: totalPosts,
      totalPages: Math.ceil(totalPosts / perPage),
      posts: posts,
    });
  } catch (error) {
    res.status(500).send({ message: (error as Error).message });
  }
};


