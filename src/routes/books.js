import { Router } from 'express';
import * as BooksController from '../controller/books.controller';
const router = Router(); // eslint-disable-line new-cap

router.get('/list', BooksController.list);

router.get('/save', BooksController.save);

module.exports = router;
