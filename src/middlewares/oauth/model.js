/* eslint-disable camelcase */
import User from '../../models/oauth/user.model';
import OAuthClient from '../../models/oauth/oauthclient.model';
import OAuthAccessToken from '../../models/oauth/oauthaccesstoken.model';
import OAuthAuthorizationCode from '../../models/oauth/oauthauthorizationcode.model';
import OAuthRefreshToken from '../../models/oauth/oauthrefreshtoken.model';

const getAccessToken = (bearerToken) => {
  return OAuthAccessToken
    .findOne({ accessToken: bearerToken })
    .populate('user')
    .populate('client')
    .then((accessToken) => {
      if (!accessToken) return false;
      return accessToken;
    })
    .catch((err) => {
      console.log('getAccessToken - Err: ', err);
    });
};

const getClient = (clientId, clientSecret) => {
  const options = { clientId: clientId };

  if (clientSecret) options.clientSecret = clientSecret;

  return OAuthClient
    .findOne(options)
    .then((client) => {
      if (!client) return new Error('client not found');
      return client;
    }).catch((err) => {
      console.log('getClient - Err: ', err);
    });
};


const getUser = (username, password) => {
  return User
    .findOne({ username: username })
    .then((user) => {
      return user.checkPassword(password) ? user : false;
    })
    .catch((err) => {
      console.log('getUser - Err: ', err);
    });
};

const revokeAuthorizationCode = (code) => {
  return OAuthAuthorizationCode.findOne({
    where: {
      code: code.code
    }
  }).then(() => {
    /** *
     * As per the discussion we need set older date
     * revokeToken will expected return a boolean in future version
     * https://github.com/oauthjs/node-oauth2-server/pull/274
     * https://github.com/oauthjs/node-oauth2-server/issues/290
     */
    let expiredCode = code;

    expiredCode.expiresAt = new Date('2015-05-28T06:59:53.000Z');
    return expiredCode;
  }).catch((err) => {
    console.log('getUser - Err: ', err);
  });
};

const revokeToken = (token) => {
  return OAuthRefreshToken.findOne({
    where: {
      refreshToken: token.refreshToken
    }
  }).then((rT) => {
    if (rT) rT.destroy();
    /** *
     * As per the discussion we need set older date
     * revokeToken will expected return a boolean in future version
     * https://github.com/oauthjs/node-oauth2-server/pull/274
     * https://github.com/oauthjs/node-oauth2-server/issues/290
     */
    let expiredToken = token;

    expiredToken.refreshTokenExpiresAt = new Date('2015-05-28T06:59:53.000Z');
    return expiredToken;
  }).catch((err) => {
    console.log('revokeToken - Err: ', err);
  });
};

const saveToken = (token, client, user) => {
  return Promise.all([
    OAuthAccessToken.create({
      accessToken: token.accessToken,
      accessTokenExpiresAt: token.accessTokenExpiresAt,
      client: client._id,
      user: user._id,
      scope: user.scope
    }),
    token.refreshToken ? OAuthRefreshToken.create({
      refreshToken: token.refreshToken,
      refreshTokenExpiresAt: token.refreshTokenExpiresAt,
      client: client._id,
      user: user._id,
      scope: user.scope
    }) : []
  ])
    .then(() => {
      return {
        client: client,
        user: user,
        accessToken: token.accessToken,
        refreshToken: token.refreshToken,
        accessTokenExpiresAt: token.accessTokenExpiresAt,
        token
      };
    })
    .catch((err) => {
      console.log('saveToken - Err: ', err);
    });
};

const getAuthorizationCode = (code) => {
  return OAuthAuthorizationCode
    .findOne({ code: code })
    .populate('user')
    .populate('client')
    .then((authCodeModel) => {
      if (!authCodeModel) return false;
      let client = authCodeModel.client;
      let user = authCodeModel.user;

      return {
        code: code,
        client: client,
        expiresAt: authCodeModel.expiresAt,
        redirectUri: client.redirectUri,
        user: user,
        scope: authCodeModel.scope
      };
    }).catch((err) => {
      console.log('getAuthorizationCode - Err: ', err);
    });
};

const saveAuthorizationCode = (code, client, user) => {
  return OAuthAuthorizationCode
    .create({
      expiresAt: code.expiresAt,
      client: client._id,
      code: code.authorizationCode,
      user: user._id,
      scope: code.scope
    })
    .then(() => {
      code.code = code.authorizationCode;
      return code;
    }).catch((err) => {
      console.log('saveAuthorizationCode - Err: ', err);
    });
};

const getUserFromClient = (client) => {
  let options = { clientId: client.client_id };

  if (client.clientSecret) options.client_secret = client.client_secret;

  return OAuthClient
    .findOne(options)
    .populate('user')
    .then((oauthClient) => {
      if (!oauthClient) return false;
      if (!oauthClient.user) return false;
      return oauthClient.user;
    }).catch((err) => {
      console.log('getUserFromClient - Err: ', err);
    });
};

const getRefreshToken = (refreshToken) => {
  if (!refreshToken || refreshToken === 'undefined') return false;

  return OAuthRefreshToken
    .findOne({ refreshToken: refreshToken })
    .populate('user')
    .populate('client')
    .then((savedRT) => {
      return savedRT;

    }).catch((err) => {
      console.log('getRefreshToken - Err: ', err);
    });
};

const verifyScope = (token, scope) => {
  return token.scope.includes(scope);
};

module.exports = {
  // generateOAuthAccessToken, optional - used for jwt
  // generateAuthorizationCode, optional
  // generateOAuthRefreshToken, - optional
  getAccessToken: getAccessToken,
  getAuthorizationCode: getAuthorizationCode,
  getClient: getClient,
  getRefreshToken: getRefreshToken,
  getUser: getUser,
  getUserFromClient: getUserFromClient,
  revokeAuthorizationCode: revokeAuthorizationCode,
  revokeToken: revokeToken,
  saveToken: saveToken,
  saveAuthorizationCode: saveAuthorizationCode,
  verifyScope: verifyScope
};
