const subscriptionMiddleware = (req, res, next) => {
    const user = req.user;
    // Assuming you have a method to check subscription
    if (!user.subscription || new Date() > user.subscriptionExpiresAt) {
        return res.status(403).json({ msg: "Upgrade subscription to access this feature" });
    }
    next();
};

export default subscriptionMiddleware;
