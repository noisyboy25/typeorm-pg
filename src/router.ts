import express from 'express';
import { getConnection } from 'typeorm';
import { User } from './model/User';
const router = express.Router();

router
  .route('/users')
  .get(async (req, res) => {
    const userRepository = getConnection().getRepository(User);
    res.send(await userRepository.find({ relations: ['photos'] }));
  })
  .post(async (req, res) => {
    const body = req.body;
    console.log(body);

    const data = body.user;
    const user = new User();
    user.firstName = data.firstName;
    user.lastName = data.lastName;
    user.age = data.age;

    const userRepository = getConnection().getRepository(User);

    await userRepository.save(user);

    res.send(await userRepository.find({ relations: ['photos'] }));
  });

export default router;
