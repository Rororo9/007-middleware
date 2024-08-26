const { v4: uuid } = require("uuid");
const express = require("express");
const fileMulter = require("../middleware/books");
const router = express.Router();

/*const app = express();
const PORT = process.env.PORT || 3000;*/

class Book {
    constructor(body) {
        this.id = uuid();
        this.title = body.title || "";
        this.description = body.description || "";
        this.authors = body.authors || "";
        this.favorite = body.favorite || "";
        this.fileCover = body.fileCover || "";
        this.fileName = body.fileName || "";
    }
}

const store = {
    books: [new Book({}), new Book({})],
};
router.use(express.json());

router.post("/api/user/login", (req, res) => {
    res.status(201);
    const user = { id: 1, mail: "test@mail.ru" };
    res.json(user);
});

router.get("/api/books", (req, res) => {
    const { books } = store;
    res.json(books);
});

router.get("/api/books/:id", (req, res) => {
    const id = req.params;
    const { books } = store;
    const index = books.findIndex((el) => el.id === id);

    if (index !== -1) {
        res.json(todo[index]);
    } else {
        res.status(404);
        res.json("404 | страница не найдена");
    }
});

router.post("/api/books", (req, res) => {
    console.log(req.body);
    const book = new Book(req.body);

    store.books.push(book);

    res.status(201);
    res.json(book);
});

router.put("/api/books/:id", (req, res) => {
    const { id } = req.params;
    const index = store.books.findIndex((el) => el.id === id);

    if (index !== -1) {
        store.books[index] = {
            ...store.books[index],
            ...req.body,
        };

        res.json(store.books[index]);
    } else {
        res.status(404);
        res.json("404 | страница не найдена");
    }
});

router.delete("/api/books/:id", (req, res) => {
    const { id } = req.params;
    const index = store.books.findIndex((el) => el.id === id);

    if (index !== -1) {
        store.books.splice(index, 1);
        res.json("ok");
    } else {
        res.status(404);
        res.json("404 | страница не найдена");
    }
});

module.exports = router;
/*
app.listen(PORT);*/
