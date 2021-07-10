const { user } = require("../../models");
const jwt = require("jsonwebtoken");

module.exports = async (req, res) => {
    const { github_id, email, age, annual } = req.body;
   
    if ( !github_id || !email ) {
        return res.status(400).json({ message: "Wrong input"});
    }
    
    const userInfo = await user.findOne({
        where: { github_id },
    });

    // 유저 정보가 DB에 없을 경우 회원 등록
    if (!userInfo) {
        try {
            await user.create({
                github_id,
                email,
                age,
                annual,
            });
            console.log("Successfully SignUp");
        } catch (err) {
            console.log(
                "-------------------------------Error occurred in sign/up.js-------------------------------- \n",
                err,
                "-------------------------------Error occurred in sign/up.js-------------------------------- \n"
            );
            res.status(500).send();
        }
    }

    // 로그인 진행
    try {
        const accessToken = jwt.sign(
            { github_id: github_id },
            process.env.ACCESS_SECRET,
            { expiresIn: "1H" }
        );
        res.status(200).json({ accessToken });
    } catch(err) {
        console.log(
            "-------------------------------Error occurred in sign/in.js-------------------------------- \n",
            err,
            "-------------------------------Error occurred in sign/in.js-------------------------------- \n"
          );
        res.status(500).send();
    }
}