import prisma from "../DB/db.config.js";
import { uploadFile } from "../helpers/upload.js";
import jwt from 'jsonwebtoken'


export const createUser = async (req, res) => {

    try {

        const { name, email, password } = req.body
        //console.log(req.body,req.file.path)

        const upload = await uploadFile(req.file.path)

        if (!name || !email || !password) {
            return res.json({ error: 'Details required.' })
        }

        const findUser = await prisma.user.findUnique({
            where: {
                email: email
            }
        })

        if (findUser) {
            return res.json({ error: 'Email already in use.' })
        }

        const user = await prisma.user.create({
            data: {
                name: name,
                email: email,
                pictureUrl: upload.secure_url,
                password: password

            }
        })

        const accessToken = jwt.sign({ user }, process.env.secretkey, { expiresIn: '360000000s' })

        res.cookie('jwt', accessToken, {
            httpOnly: true,
            secure: true, // ❗ set to true in production (requires HTTPS)
            sameSite: 'None',
            maxAge: 3600000 // 1 hour
        })
        return res.json({
            message: 'User signed in successfully.'
        });
    }
    catch (error) {
        return res.json({ error: 'An error occured.', error });
    }
}

export const loginUser = async (req, res) => {

    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.json({
                error: 'Provide Credential.'
            })
        }

        const user = await prisma.user.findFirst({
            where: {
                email: email,
                password: password
            }
        })

        if (!user) {
            return res.json({
                error: "No user found with provided credential."
            })
        }

        const accessToken = jwt.sign({user},process.env.secretkey,{expiresIn:'360000000s'})

        res.cookie('jwt', accessToken, {
            httpOnly: true,
            secure: true, // ❗ set to true in production (requires HTTPS)
            sameSite: 'None',
            maxAge: 3600000 // 1 hour
        })
        return res.json({
            message: 'User logged in successfully.'
        });
    }
    catch (error) {
        return res.json({ error: 'An error occured.', error });
    }

}

export const getAllUser = async(req,res) =>{
    try {

        const id = req.user.newUser.id
        
        const isUser = await prisma.user.findUnique({
            where:{
                id:id,
            }
        })

        if(!isUser){
            return res.json({message:'No user found.'})
        }

        const users = await prisma.user.findMany({})

        if(!users){
            return res.json({message:'No users found.'})
        }

        return res.json({
            message:'Users fetched.',
            users
        })

    } catch (error) {
        return res.json({message:'Error occured.',error})
    }
} 
