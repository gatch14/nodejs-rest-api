import { Router } from 'express';
import { oauth } from '../middlewares/oauth';
import { Request, Response } from 'oauth2-server';
const router = Router(); // eslint-disable-line new-cap

router.post('/token', (req, res, next) => {
  const request = new Request(req);
  const response = new Response(res);

  oauth.token(request, response)
    .then(() => {
      res.set(response.headers);
      res.json(response.body);
    }).catch((err) => next(err));
});

router.post('/authorize', (req, res, next) => {
  const request = new Request(req);
  const response = new Response(res);

  oauth.authorize(request, response).then(() => {
    res.status(response.status).set(response.headers).end();
  }).catch((err) => next(err));
});

module.exports = router;
