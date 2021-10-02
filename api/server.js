const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const mongoose = require('mongoose');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true
  })
  .then(() => console.log('DB successfully connected'));

const port = process.env.PORT || 5000;

const app = require('./app');

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
