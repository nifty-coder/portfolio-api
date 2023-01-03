require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const HttpError = require('./models/http-error');
const statusRoute = require('./routes/status');
const basicInfoRoutes = require('./routes/basic-info');
const projectsRoutes = require('./routes/projects');
const techStacksRoutes = require('./routes/techs');
const toolsdbRoutes = require('./routes/toolsdb');
const certificatesRoutes = require('./routes/certificates');
const packagesRoutes = require('./routes/packages');
console.log(process.env.NODE_ENV);
const api = express();
const port = process.env.PORT || 5000;

api.get('/favicon.ico', (req, res, next) => res.status(200));
api.use(bodyParser.json());
api.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

api.get('/', (req, res, next) => {
  res.send('Welcome');
});

api.use('/api/status', statusRoute);
api.use('/api/basicInfo', basicInfoRoutes);
api.use('/api/projects', projectsRoutes);
api.use('/api/techStacks', techStacksRoutes);
api.use('/api/toolsOrDbs', toolsdbRoutes);
api.use('/api/certificates', certificatesRoutes);
api.use('/api/packages', packagesRoutes);

api.use((err, req, res, next) => {
  return next(new HttpError("Couldn't find this route page. Try again!", 404)); 
});
 
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.rmxwo.mongodb.net/app_db?retryWrites=true&w=majority`)
.then(() => api.listen(port, () => console.log(`Api listening on port ${port}!`)))
.catch(error => console.log(error));

module.exports = api;