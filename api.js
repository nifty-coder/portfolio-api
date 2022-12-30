const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const HttpError = require('./models/http-error');
const statusRoute = require('./routes/status');
const basicInfoRoutes = require('./routes/basic-info');
const projectsRoutes = require('./routes/projects');
const techStacksRoutes = require('./routes/techs');
const toolsdbRoutes = require('./routes/toolsdb');
const certificatesRoutes = require('./routes/certificates');
const packagesRoutes = require('./routes/packages');

const app = express();
const port = process.env.PORT || 5000;

app.get('/favicon.ico', (req, res) => res.status(200));
app.use(bodyParser.json());
app.use(cors({
  allowedHeaders: ['Access-Control-Allow-Origin: *']
}));

app.use('/api/status', statusRoute);
app.use('/api/basicInfo', basicInfoRoutes);
app.use('/api/projects', projectsRoutes);
app.use('/api/techStacks', techStacksRoutes);
app.use('/api/toolsOrDbs', toolsdbRoutes);
app.use('/api/certificates', certificatesRoutes);
app.use('/api/packages', packagesRoutes);

app.use((err, req, res, next) => {
  return next(new HttpError("Couldn't find this route page. Try again!", 404)); 
});
 
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.rmxwo.mongodb.net/app_db?retryWrites=true&w=majority`)
  .then(() => app.listen(port, () => console.log(`App listening on port ${port}!`)))
  .catch(error => console.log(error));