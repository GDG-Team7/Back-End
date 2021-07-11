const { user } = require("../../models");

module.exports = async (req, res) => {
    const body = req.body

    try {
        await user.update({
            age: body.age,
            annual: body.annual
        }, {
            where: {github_id: req.authData.github_id}
        })

        res.status(200).json({"message": "Successfully Update"})
    } catch(err) {
        console.log('update error');
        res.status(400).send();
    }
}