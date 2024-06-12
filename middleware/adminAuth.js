
module.exports = function(req, res, next) {
    const user = req.user; // Assuming user object is stored in req.user after authentication
    if (user && user.isAdmin) {
        return next(); // User is admin, proceed to the next middleware/route handler
    }
    res.status(403).json({ message: 'Forbidden' }); // User is not an admin, return forbidden status
};