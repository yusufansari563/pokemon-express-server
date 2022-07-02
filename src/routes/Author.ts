import expres from "express";
import Author from "../controllers/Author";

const router = expres.Router();

router.post('/create', Author.createAuthor);
router.get('/get/:AuthorId', Author.readAuthor);
router.get('/get/', Author.readAllAuthor);
router.patch('/update/:AuthorId', Author.updateAuthor);
router.delete('/delete/:AuthorId', Author.deleteAuthor);

export default router;