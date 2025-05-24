import express from 'express';
import dotenv from 'dotenv';
import routes from './Routes/index.js';
import cors from 'cors';
import passport from 'passport';
import { Strategy as OAuth2Strategy } from 'passport-google-oauth2';
import prisma from './DB/db.config.js';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();
const PORT = process.env.port;

//Cors 
app.use(
    cors({
        origin: `${process.env.frontend}`,
        methods: "GET,POST,PUT,DELETE",
        credentials: true
    })
);

//Middleware 
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Set-up Passport
app.use(passport.initialize())


passport.use(
    new OAuth2Strategy({
        clientID: process.env.clientid,
        clientSecret: process.env.clientsecret,
        callbackURL: "/auth/google/callback",
        scope: ["profile", "email"]
    },
        async (accessToken, refreshToken, profile, done) => {
            //console.log(profile)
            try {
                let user = await prisma.user.findFirst({
                    where: {
                        googleId: profile.id
                    }
                })

                if (!user) {
                    user = await prisma.user.create({
                        data: {
                            googleId: profile.id,
                            name: profile.displayName,
                            email: profile.emails[0].value,
                            pictureUrl: profile.photos[0].value
                        }
                    })
                }
                return done(null, user)

            } catch (error) {
                return done(error, null)
            }
        }
    )
)

passport.serializeUser((user, done) => {
    done(null, user);
})

passport.deserializeUser((user, done) => {
    done(null, user);
})

//Initialize auth login
app.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

app.get("/auth/google/callback", passport.authenticate('google', { session: false, failureRedirect: '/' }),
    (req, res) => {
        const user = {
            id: req.user.id,
            googleId: req.user.googleId,
            name: req.user.name,
            email: req.user.email,
            pictureUrl: req.user.pictureUrl
        }
        const token = jwt.sign(user, `${process.env.secretkey}`, { expiresIn: '1h' });

        res.cookie('jwt', token, {
            httpOnly: true,
            secure: true, // ❗ set to true in production (requires HTTPS)
            sameSite: 'None',
            maxAge: 3600000 // 1 hour
        });

        res.redirect(`${process.env.frontend}/`);
    }
)


app.get('/login/success', async (req, res) => {
    const token = req.cookies.jwt;
    if (!token) {
        return res.status(401).json({ message: 'No token, not authenticated' });
    }
    try {
        const user = jwt.verify(token, process.env.secretkey);
        res.json({ user });
    } catch (err) {
        return res.status(401).json({ message: 'Token invalid or expired' });
    }
})


app.get('/auth/logout', async (req, res) => {
    res.clearCookie('jwt', {
        httpOnly: true,
        secure: true, // ❗ set to true in production (requires HTTPS)
        sameSite: 'None'    
      });
    res.status(200).json({ message: 'Logged out' });
});

//Route file
app.use(routes);


app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`))
