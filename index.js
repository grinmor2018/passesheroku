const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');


if(process.env.NODE_ENV !== 'production'){
    require ('dotenv').config();
}
const { mongoose } = require('./database');



// settings
app.set('port', process.env.PORT || 4000);

//middlewares
app.use(cors());
app.use(express.json());

//routes
app.use('/api/functions', require('./routes/functions'));

//static files
app.use(express.static(path.join(__dirname,'/public')));

//starting the server
async function main(){
    await app.listen(app.get('port'));
    console.log(`Server on port ${app.get('port')}` );
}

main();