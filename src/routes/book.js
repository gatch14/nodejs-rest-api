import { Router } from 'express';
import * as BookController from '../controller/book.controller';
const router = Router(); // eslint-disable-line new-cap

router.get('/list', BookController.list);

router.get('/save', BookController.save);

module.exports = router;
