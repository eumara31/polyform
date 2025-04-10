"use strict";
exports.__esModule = true;
exports.requireAuth = void 0;
function requireAuth(req, res, next) {
    if (!req.session.user) {
        return res.status(401).json({ error: "Not authenticated" });
    }
    next();
}
exports.requireAuth = requireAuth;
