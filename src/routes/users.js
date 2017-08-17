import { Router } from 'express';
import * as UsersController from '../controller/users.controller';
const router = Router(); // eslint-disable-line new-cap

router.get('/list', UsersController.list);

router.post('/save', UsersController.save);

module.exports = router;
