import { Request, Response } from 'express'

// DB
import { connect } from '../database'
// Interfaces
import { Post } from '../interface/Post'

export async function getPosts(req: Request, res: Response): Promise<Response | void> {
    try {
        const conn = await connect();
        const posts = await conn.query('SELECT id, PostTitle, CategoryId, SubCategoryId, PostDetails, PostingDate, PostUrl, PostImage, Is_Click FROM tblposts WHERE Is_Active = ?', [1]);
        return res.json(posts[0]);
    }
    catch (e) {
        console.log(e)
    }
}

// export async function createPost(req: Request, res: Response) {
//     const newPost: Post = req.body;
//     const conn = await connect();
//     await conn.query('INSERT INTO tblposts SET ?', [newPost]);
//     res.json({
//         message: 'New Post Created'
//     });
// }

export async function getPost(req: Request, res: Response) {
    const id = req.params.postId;
    const conn = await connect();
    const posts = await conn.query('SELECT id, PostTitle, CategoryId, SubCategoryId, PostDetails, PostingDate, PostUrl, PostImage, Is_Click FROM tblposts WHERE id = ? AND Is_Active = ?', [id, 1]);
    res.json(posts[0]);
}

// export async function deletePost(req: Request, res: Response) {
//     const id = req.params.postId;
//     const conn = await connect();
//     await conn.query('DELETE FROM tblposts WHERE id = ?', [id]);
//     res.json({
//         message: 'Post deleted'
//     });
// }

// export async function updatePost(req: Request, res: Response) {
//     const id = req.params.postId;
//     const updatePost: Post = req.body;
//     const conn = await connect();
//     await conn.query('UPDATE tblposts set ? WHERE id = ?', [updatePost, id]);
//     res.json({
//         message: 'Post Updated'
//     });
// }