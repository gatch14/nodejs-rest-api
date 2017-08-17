import { authenticate } from '../middlewares/oauth';
import { Router } from 'express';
const router = Router(); // eslint-disable-line new-cap

import BadRequestError from '../utils/errors/bad-request';

/* GET home page. */
router.get('/', (req, res) => {
  res.json({ title: 'homepage' });
});

router.get('/secured', authenticate({ scope: 'admin' }), (req, res) => {
  res.json({ title: 'secured' });
});

router.get('/error', (req, res, next) => {
  next(new BadRequestError());
});

module.exports = router;
