const roleMiddleware = (roles) => {
  return (req, res, next) => {

    if (!req.user || !req.user.role) {
      return res.status(403).json({
        message: "Accès interdit - Vous n'avez pas de rôle défini",
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: "Accès interdit - Votre rôle ne vous permet pas d'accéder à cette ressource",
      });
    }

    next();
  };
};

module.exports = roleMiddleware;