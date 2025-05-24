import prisma from '../DB/db.config.js';
import { uploadFile } from "../helpers/upload.js";

export const createPost = async (req, res) => {

    try {
        console.log(req.user)
        const user_id = req.user.id || req.user.user.id;
        const { title, description } = req.body;

        if (!title || !description) {
            return res.json({ message: 'Details required.' })
        }

        const upload = await uploadFile(req.file.path);

        const newPost = await prisma.post.create({
            data: {
                user_id: user_id,
                title: title,
                description: description,
                imageUrl: upload.secure_url
            }
        })

        return res.json({ message: 'Post created.', newPost })


    } catch (error) {
        return res.json({ message: 'An error occured.', error });
    }
}

export const updatePost = async (req, res) => {
    try {

        const post_id = req.params.id;
        const { title, description } = req.body;

        const post = await prisma.post.findUnique({
            where: {
                id: Number(post_id)
            }
        })

        if (!post) {
            return res.json({ message: 'No Posts found.' });
        }

        const updatedPost = await prisma.post.update({
            where: {
                id: Number(post_id),
            },
            data: {
                title,
                description
            },
        })

        return res.json({ message: 'Blog updated', updatedPost })


    } catch (error) {
        return res.json({ error: 'An error occured.'});
    }
}



export const getAllPost = async (req, res) => {
    try {

        const posts = await prisma.post.findMany();

        if (!posts) {
            return res.json({ message: 'No Posts found.' });
        }

        return res.json({ message: 'All posts fetched.', posts });

    } catch (error) {
        return res.json({ message: 'An error occured.', error });
    }
}

export const getPostById = async (req, res) => {
    try {
        const post_id = req.params.id;

        const post = await prisma.post.findUnique({
            where: {
                id: Number(post_id)
            }
        })

        if (!post) {
            return res.json({ message: 'No post found with provided ID.' })
        }

        return res.json({ message: 'Post fetched.', post })

    } catch (error) {
        return res.json({ message: 'An error occured.', error });
    }
}

export const getByUserId = async (req, res) => {

    try {
        const user_id = req.params.id;

        const post = await prisma.post.findMany({
            where: {
                user_id: Number(user_id)
            }
        })

        if (!post) {
            return res.json({ message: 'No post found with provided ID.' })
        }

        return res.json({ message: 'Post fetched.', post })

    } catch (error) {
        return res.json({ message: 'An error occured.', error });
    }
}


export const searchByName = async (req, res) => {

    try {
        const { name } = req.body;

        const post = await prisma.post.findMany({
            where: {
                title: {
                    startsWith: name
                },
            },
        })

        if (!post) {
            return res.json({ message: 'No Post found.' })
        }

        return res.json({ message: 'Post Found.', post })
    } catch (error) {
        return res.json({ message: 'An error occured.', error });
    }
}

export const deletePost = async (req, res) => {

    try {

        const post_id = req.params.id;

        const isPost = await prisma.post.findUnique({
            where: {
                id: Number(post_id)
            }
        })

        if (!isPost) {
            return res.json({ message: 'No post found with given ID.' })
        }

        await prisma.post.delete({
            where: {
                id: Number(post_id)
            }
        })

        return res.json({ message: 'Post deleted.' })

    } catch (error) {
        return res.json({ message: 'An error occured.', error });
    }
}