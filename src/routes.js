const { Router } = require("express");
const RegisterController = require("./app/controllers/RegisterController.js");
const LoginController = require("./app/controllers/LoginController.js");
const ClubsController = require("./app/controllers/ClubsController.js");
const ForgotController = require("./app/controllers/ForgotController.js");
const GoogleLoginController = require("./app/controllers/GoogleLoginController.js");
const TournamentsController = require("./app/controllers/TournamentsController.js");
const MatchesController = require("./app/controllers/MatchesController.js");
const PhasesController = require("./app/controllers/PhasesController.js");
const RoundsController = require("./app/controllers/RoundsController.js");
const multerconfig = require("./config/multer.js");
const multer = require("multer");

const authMiddlewares = require("./app/middlewares/auth.js");
const ConfigTournamentsController = require("./app/controllers/ConfigTournamentsController.js");
const GeneratedMatchesController = require("./app/controllers/GeneratedMatchesController.js");

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
routes.get("/clubs", ClubsController.index);
routes.put("/clubs/:id", upload.single("file"), ClubsController.update);
routes.delete("/clubs/:id", ClubsController.delete);

// TOURNAMENTS ROUTES
routes.post("/tournaments", upload.single("file"), TournamentsController.store);
routes.get("/tournaments", TournamentsController.index);
routes.get("/tournaments/:id", TournamentsController.show);
routes.put(
  "/tournaments/:id",
  upload.single("file"),
  TournamentsController.update
);
routes.delete("/tournaments/:id", TournamentsController.delete);

routes.patch(
  "/tournaments/change/:id",
  ConfigTournamentsController.changeTournamentStatus
);
routes.post("/tournaments/add/:id", ConfigTournamentsController.addClubs);

// PHASES ROUTES
routes.get("/phases", PhasesController.index);
routes.get("/phases/:id", PhasesController.show);
routes.post("/phases", PhasesController.store);
routes.put("/phases/:id", PhasesController.update);
routes.delete("/phases/:id", PhasesController.delete);

// ROUNDS ROUTES
routes.get("/rounds", RoundsController.index);
routes.get("/rounds/:id", RoundsController.show);
routes.post("/rounds", RoundsController.store);
routes.put("/rounds/:id", RoundsController.update);
routes.delete("/rounds/:id", RoundsController.delete);

// MATCHES ROUNDS
routes.get("/matches", MatchesController.index);
routes.get("/matches/:id", MatchesController.show);
routes.post("/matches", MatchesController.store);
routes.delete("/matches/:id", MatchesController.delete);

routes.post(
  "/matches/league/generator/:id",
  GeneratedMatchesController.generatedLeagueMatches
);

module.exports = routes;
