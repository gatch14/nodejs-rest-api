import util from 'util';
import User from '../models/oauth/user.model';
import BadRequestError from '../utils/errors/bad-request';
import DatabaseError from '../utils/errors/database';

const save = (req, res, next) => {

  req.check({
    username: {
      notEmpty: {
        errorMessage: 'error_required'
      },
      isLength: {
        options: [ { min: 5, max: 50 } ],
        errorMessage: 'error_min_max'
      }
    },
    password: {
      notEmpty: {
        errorMessage: 'error_required'
      }
    }
  });

  req.getValidationResult().then((result) => {
    if (!result.isEmpty()) {
      next(new BadRequestError(util.inspect(result.array())));
    } else {
      const newUser = new User({ username: req.body.username, password: req.body.password, scope: 'app' });

      newUser.save()
        .then((user) => {
          res.json({ user });
        }).catch((err) => {
          next(new DatabaseError(err));
        });
    }
  });

};

const list = (req, res, next) => {
  User.find({})
    .exec()
    .then((users) => {
      res.json({ users });
    })
    .catch((err) => {
      next(new DatabaseError(err));
    });
};

module.exports = {
  list,
  save
};
