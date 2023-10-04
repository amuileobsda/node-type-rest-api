import { Request, Response } from 'express'

// DB
import { connect } from '../database'
// Interfaces
import { Post } from '../interface/Post'

export async function getPosts(req: Request, res: Response): Promise<Response | void> {
    try {
        // 클라이언트로부터 페이지 번호와 페이지 당 아이템 개수를 받아옴
        const page: number | undefined = Number(req.query.page);
        const itemsPerPage: number | undefined = Number(req.query.itemsPerPage);
        const conn = await connect();

        if (page !== undefined && itemsPerPage !== undefined) {

            // 페이지 번호와 페이지 당 아이템 개수를 이용하여 적절한 데이터를 가져오는 쿼리를 작성
            const offset = (page - 1) * itemsPerPage;
            const posts = await conn.query(
                'SELECT id, PostTitle, CategoryId, SubCategoryId, PostDetails, PostingDate, PostUrl, PostImage, Is_Click FROM tblposts WHERE Is_Active = ? ORDER BY PostingDate DESC LIMIT ?, ?',
                [1, offset, itemsPerPage]
            );
            await conn.end();  // 반환 후 연결 닫기

            return res.json(posts[0]);
        }else {
            // 유효하지 않은 값 또는 누락된 값에 대한 에러 처리
            res.status(404).json({ error: 'Not Found' });
        }
    }
    catch (e) {
        console.log(e);
        res.status(500).json({ error: 'Internal Server Error' });
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
    try {
        const conn = await connect();
        const posts = await conn.query('SELECT id, PostTitle, CategoryId, SubCategoryId, PostDetails, PostingDate, PostUrl, PostImage, Is_Click FROM tblposts WHERE id = ? AND Is_Active = ? ORDER BY PostingDate DESC', [id, 1]);
        
        await conn.end(); // 반환 후 연결 닫기

        res.json(posts[0]);
    } catch (e) {
        console.log(e);
        res.status(500).json({ error: 'Internal Server Error' });
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