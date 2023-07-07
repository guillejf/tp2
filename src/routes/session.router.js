import express from "express";
import passport from "passport";
export const sessionRouter = express.Router();

sessionRouter.get("/login", async (req, res) => {
  try {
    const title = "Fuego Burgers® - Login";
    return res.status(200).render("login", { title });
  } catch (err) {
    console.log(err);
    res
      .status(501)
      .send({ status: "error", msg: "Error en el servidor", error: err });
  }
});

//TODO #4
sessionRouter.post(
  "/login",
  passport.authenticate("login", { failureRedirect: "/" }),
  async (req, res) => {
    if (!req.user) {
      //TODO #5
      return res.status(500).render("error-auth");
    }
    req.session.user = {
      _id: req.user._id,
      email: req.user.email,
      firstName: req.user.firstName,
      rol: req.user.rol,
    };

    return res.redirect("/products");
  }
);

sessionRouter.get("/register", async (req, res) => {
  try {
    const title = "Fuego Burgers® - Register";
    return res.status(200).render("register", { title });
  } catch (err) {
    console.log(err);
    res
      .status(501)
      .send({ status: "error", msg: "Error en el servidor", error: err });
  }
});

//TODO #4
sessionRouter.post(
  "/register",
  passport.authenticate("register", { failureRedirect: "/" }),
  (req, res) => {
    if (!req.user) {
      //TODO #5
      return res.status(500).render("error-auth");
    }
    req.session.user = {
      _id: req.user._id,
      email: req.user.email,
      firstName: req.user.firstName,
      rol: req.user.rol,
    };
    return res.redirect("/products");
    // return res.json({ msg: "ok", payload: req.user });
  }
);

sessionRouter.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error al cerrar sesión:", err);
    }
    res.redirect("/");
  });
});

sessionRouter.get("/current", (req, res) => {
  console.log(req.session);
  return res.status(200).json({ user: req.session.user });
});
