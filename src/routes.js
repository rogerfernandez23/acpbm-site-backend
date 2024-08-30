const { Router } = require("express");
const RegisterController = require("./app/controllers/RegisterController.js");
const LoginController = require("./app/controllers/LoginController.js");
const ClubsController = require("./app/controllers/ClubsController.js");
const ForgotController = require("./app/controllers/ForgotController.js");
const GoogleLoginController = require("./app/controllers/GoogleLoginController.js");
const multerconfig = require("./config/multer.js");
const multer = require("multer");

const authMiddlewares = require("./app/middlewares/auth.js");

const upload = multer(multerconfig);
const routes = Router();

routes.get("/", (req, res) => {
  return res.json({ sucess: "Servidor iniciado!! 🚀" });
});

// ROUTES FREE
routes.post("/register", RegisterController.store);
routes.post("/login", LoginController.store);
routes.post("/login/google", GoogleLoginController.store);
routes.post("/recovery", ForgotController.store);
routes.patch("/savepass", ForgotController.update);

routes.use(authMiddlewares);

// USER ROUTES
routes.get("/users", RegisterController.index);
routes.put("/club/:id", RegisterController.update);

// CLUBS ROUTES
routes.post("/clubs", upload.single("file"), ClubsController.store);
routes.get("/clubs", upload.single("file"), ClubsController.index);
routes.put("/clubs/:id", upload.single("file"), ClubsController.update);
routes.delete("/clubs/:id", upload.single("file"), ClubsController.delete);

module.exports = routes;
