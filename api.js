const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const HttpError = require('./models/http-error');
const projectsRoutes = require('./routes/projects-routes');
const techStacksRoutes = require('./routes/techs-routes');
const toolsdbRoutes = require('./routes/toolsdb-routes');
const certificatesRoutes = require('./routes/certificates-routes');
const packagesRoutes = require('./routes/packages-routes');

const app = express();
const port = process.env.PORT || 5000;
const CONNECTION_URI = process.env.MONGODB_URI || `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.rmxwo.mongodb.net/app_db?retryWrites=true&w=majority`;
app.use(bodyParser.json());
app.use(cors());

app.use('/api/projects', projectsRoutes);
app.use('/api/techStacks', techStacksRoutes);
app.use('/api/toolsOrDbs', toolsdbRoutes);
app.use('/api/certificates', certificatesRoutes);
app.use('/api/packages', packagesRoutes);

app.use((req, res, next) => {
  return next(new HttpError("Couldn't find this route page. Try again!", 404)); 
});
 
mongoose.connect(CONNECTION_URI, 
  {
      useNewUrlParser:true,
      useUnifiedTopology:true
  })
  .then(() => app.listen(port, () => console.log(`App listening on port ${port}!`)))
  .catch(error => console.log(error));