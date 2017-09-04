// library and controller initiazation
import express  from 'express';
import bodyParser from 'body-parser';
import { apiRouter, isLoggedIn } from './route/api';
import jwt from 'jsonwebtoken';

const app = express();

//secret for json web token
app.set('secret_key', process.env.SECRET_KEY)
//for parsing body content
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//routes
app.use('/api', /* isLoggedIn, */ apiRouter);
app.all('*', (req, res) => {
  res.status(404).send("404: Not Found"); 
});


// server initialization
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Server running. listening on port: " + port);
});


export {app, jwt};