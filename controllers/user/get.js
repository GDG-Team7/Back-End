module.exports = (req, res) => {
    res.json({"userInfo": req.authData});
}