import { Request, Response } from 'express'

// DB
import { connect } from '../database'
// Interfaces
import { Category } from '../interface/Category'

export async function getCategories(req: Request, res: Response): Promise<Response | void> {
    try {
        const conn = await connect();
        const categories = await conn.query('SELECT id, CategoryName, Description FROM tblcategory WHERE Is_Active = ? ORDER BY PostingDate DESC', [1]);

        await conn.end(); // 반환 후 연결 닫기

        return res.json(categories[0]);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({ error: 'Internal Server Error' });
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

export async function getCategory(req: Request, res: Response) {
    const id = req.params.categoryId;
    try {
        const conn = await connect();
        const categories = await conn.query('SELECT id, CategoryName, Description FROM tblcategory WHERE id = ? AND Is_Active = ? ORDER BY PostingDate DESC', [id, 1]);

        await conn.end(); // 반환 후 연결 닫기

        res.json(categories[0]);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
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