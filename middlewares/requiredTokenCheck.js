module.exports = async (req, res, next) => {
    const { authorization } = req.headers;
    
    if (!authorization) {
        return res.status(400).json({ message: "Insufficient info"});
    }

    await require('./tokenCheckCore')(req, res, next, authorization);
}