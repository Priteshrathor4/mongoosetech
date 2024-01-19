import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import studentRoute from './src/routes/studentRoute.js';
import adminRoute from './src/routes/adminRoute.js';
const app = express();
const PORT = 4000;
app.use(cors());
// app.use(express.json());
app.use(bodyParser.json());

app.use('/api/admin',studentRoute);
app.use('/api/admin',adminRoute);

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
})