const Author = require('./Author');
const Book = require('./Book');

// Связь "один-ко-многим": один автор — много книг.
// Определяется парой hasMany (на "родителе") + belongsTo (на "ребёнке").
Author.hasMany(Book, {
    foreignKey: 'authorId',
    as: 'books',
});

Book.belongsTo(Author, {
    foreignKey: 'authorId',
    as: 'author',
});

module.exports = { Author, Book };
