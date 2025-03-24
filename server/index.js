import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import cookieParser from 'cookie-parser'
import { connectDB } from './config/db.js'
import AuthRouter from './routes/AuthRoutes.js'
import UserRouter from './routes/UserRoutes.js'



const app = express()
const PORT = process.env.PORT || 4000
const allowedOrigins = [process.env.FRONTEND]

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://mern-authentication-peach.vercel.app');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true'); // If using cookies
  next();
});

//call the DB fun.
connectDB()



app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:allowedOrigins,
    credentials: true,
}))


//API's Endpoints...........

app.get('/', (req, res)=>{
    res.send(`<h1> API's is Working... </h1>`)
})
app.use('/api/auth',  AuthRouter)
app.use('/api/user', UserRouter)






app.listen(PORT,()=>{
    console.log(`Server running on PORT : ${PORT}`)
})





