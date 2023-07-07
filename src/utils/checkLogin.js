export function checkLogin(req, res, next) {
  if (req.session?.user?._id) {
    return next();
  } else {
    return res.status(401).render("error-auth");
  }
}

export function checkAdmin(req, res, next) {
  if (req.session?.user?.rol == "admin") {
    return next();
  } else {
    //TODO #6
    return res.status(403).render("error-auth");
  }
}
