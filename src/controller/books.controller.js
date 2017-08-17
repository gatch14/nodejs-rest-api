import util from 'util';
import Book from '../models/book.model';
import BadRequestError from '../utils/errors/bad-request';
import DatabaseError from '../utils/errors/database';

const save = (req, res, next) => {

  req.check({
    title: {
      notEmpty: {
        errorMessage: 'error_required'
      },
      isLength: {
        options: [ { min: 2, max: 10 } ],
        errorMessage: 'error_min_max'
      }
    },
    author: {
      notEmpty: {
        errorMessage: 'error_required'
      }
    }
  });

  req.getValidationResult().then((result) => {
    if (!result.isEmpty()) {
      next(new BadRequestError(util.inspect(result.array())));
    } else {
      const newBook = new Book({ title: req.body.title, author: req.body.author });

      newBook.save()
        .then((book) => {
          res.json({ book });
        }).catch((err) => {
          next(new DatabaseError(err));
        });
    }
  });

};

const list = (req, res, next) => {
  Book.find({})
    .exec()
    .then((books) => {
      res.json({ books });
    })
    .catch((err) => {
      next(new DatabaseError(err));
    });
};

module.exports = {
  list,
  save
};
