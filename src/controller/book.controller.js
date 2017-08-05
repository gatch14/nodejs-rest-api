import Book from '../models/book.model';
import DatabaseError from '../utils/errors/database';

const save = (req, res, next) => {
  const newBook = new Book({ title: req.body.title, author: req.body.author });

  newBook.save()
    .then((book) => {
      res.json({ book });
    }).catch((err) => {
      next(new DatabaseError(err));
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
