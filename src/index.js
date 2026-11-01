const sequelize = require('./db');
const { Author, Book } = require('./models/associations');

async function main() {
    try {
        // Проверка подключения к базе данных
        await sequelize.authenticate();
        console.log('Подключение к базе данных установлено успешно.');

        // Синхронизация моделей с учётом ассоциаций (создание таблиц authors и books)
        await sequelize.sync({ force: true });
        console.log('Таблицы authors и books синхронизированы.');

        // Создание автора ("родителя")
        const author = await Author.create({
            name: 'Фёдор Достоевский',
            country: 'Россия',
        });

        // Специальный метод createX: создаёт связанную запись через ассоциацию hasMany
        await author.createBook({
            title: 'Преступление и наказание',
            year: 1866,
            genre: 'роман',
        });

        // Специальный метод addX: связывает уже существующую запись с автором
        const extraBook = await Book.create({
            title: 'Идиот',
            year: 1869,
            genre: 'роман',
        });
        await author.addBook(extraBook);

        // Ещё один автор с двумя книгами
        const secondAuthor = await Author.create({
            name: 'Джордж Оруэлл',
            country: 'Великобритания',
        });
        await secondAuthor.createBook({
            title: '1984',
            year: 1949,
            genre: 'антиутопия',
        });
        await secondAuthor.createBook({
            title: 'Скотный двор',
            year: 1945,
            genre: 'сатира',
        });

        console.log('Авторы и книги успешно добавлены.');

        // Специальный метод countX: количество книг у первого автора
        const booksCount = await author.countBooks();
        console.log(`У автора «${author.name}» книг в базе: ${booksCount}`);

        // Жадная загрузка связанных данных через include и псевдоним as
        const authors = await Author.findAll({
            include: { association: 'books', as: 'books' },
        });

        console.log('Список авторов и их книг:');
        authors.forEach((a) => {
            console.log(`\n${a.name} (${a.country})`);
            a.books.forEach((book) => {
                console.log(`  — ${book.title} (${book.year}, ${book.genre})`);
            });
        });
    } catch (error) {
        console.error('Произошла ошибка:', error);
    } finally {
        // Закрытие соединения с базой данных
        await sequelize.close();
        console.log('\nСоединение с базой данных закрыто.');
    }
}

main();
