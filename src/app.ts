import 'reflect-metadata';
import express from 'express';
import { createConnection } from 'typeorm';
import { User } from './model/User';
import { Photo } from './model/Photo';
import router from './router';

const PORT = process.env.PORT || 3000;

createConnection({
  type: 'sqlite',
  database: 'test.db',
  entities: [User, Photo],
  synchronize: true,
})
  .then(async (connection) => {
    const app = express();

    app.use(express.json());

    app.use('/api', router);

    app.get('/', (req, res) => res.send('Hello World'));

    app.listen(PORT, () =>
      console.log(`Listening on http://localhost:${PORT}`)
    );
  })
  .catch((error) => console.log(error));
