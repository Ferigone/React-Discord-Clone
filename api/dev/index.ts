import { Router } from "express";

// Import All Routes
import LoginRoute from './routes/login';
import RegisterRoute from './routes/register';

const router = Router();


router.get("/", (req, res) => {
    res.json({ message: "Hello World" });
    }
);

router.use('/login', LoginRoute);
router.use('/register', RegisterRoute);

export default router;
