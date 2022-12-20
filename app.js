require('dotenv').config();

const express = require('express');

const HTTP_PORT=process.env.HTTP_PORT;

const morgan = require('morgan');
const cors = require('cors');
const router = require('./routes')

// const {DataSource} = require('typeorm');

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.use(router);

// const myDB = new DataSource({
//     type:process.env.TYPEORM_CONNECTION,
//     host:process.env.TYPEORM_HOST,
//     port:process.env.TYPEORM_PORT,
//     username:process.env.TYPEORM_USERNAME,
//     password:process.env.TYPEORM_PASSWORD,
//     database:process.env.TYPEORM_DATABASE
// })

app.get('/ping', (req, res)=>{
    res.status(200).json({message:"HI_IM_SO_GOOD"})
})

// myDB.initialize()
//     .then(() => {
//         console.log('DATASOURCE has been initialized!');
//     }) .catch((err)=>{
//         console.error('Error during Data Source initialization');
//     })

const start = () => {
    try{app.listen(HTTP_PORT, () => console.log(`server listening on port ${HTTP_PORT}`));}
    catch(error){
        console.error('FAILED');
    }
}

start();