import { Router } from "express"
import { UserController } from "./controllers/UserController.js"

const userController = new UserController()
const router = Router()

router.post("/user", userController.createUser)
router.get("/user", userController.getAllUsers)

export default router