import OAuthServer from 'oauth2-server';
import model from './model';

const Request = OAuthServer.Request;
const Response = OAuthServer.Response;

const oauth = new OAuthServer({
  model,
  allowBearerTokensInQueryString: true,
  accessTokenLifetime: 4 * 60 * 60,
  refreshTokenLifetime: 30 * 24 * 60 * 60
});

const authenticate = (opts) => {
  const options = opts || {};

  return (req, res, next) => {
    const request = new Request({
      headers: { authorization: req.headers.authorization },
      method: req.method,
      query: req.query,
      body: req.body
    });
    const response = new Response(res);

    oauth.authenticate(request, response, options)
      .then((token) => {
        // Request is authorized.
        req.user = token;
        next();
      })
      .catch((err) => {
        // Request is not authorized.
        res.status(err.code || 500).json(err);
      });
  };
};

module.exports = {
  oauth,
  authenticate
};
