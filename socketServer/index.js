const { member, platform, user, Sequelize, sequelize } = require("../models");
const jwt = require("jsonwebtoken");

module.exports = (io) => {
  io.on("connection", socket => {
    //방장 client가 방을 만들면 발생하는 이벤트
    socket.on("makeRoom", (roomId) => {
      socket.join(`room${roomId}`);
    });

    //요청 client가 링크 공유 요청 시 발생하는 이벤트
    socket.on("reqGrant", async (roomId, githubLink, accessToken) => {
      try {
        await sequelize.transaction(async t => {
          const platformResult = await platform.findOne({
            where: { room_id: roomId },
            transaction: t,
            raw: true
          });

          const authData = jwt.verify(accessToken, process.env.ACCESS_SECRET);

          const userInfo = await user.findOne({
            where: {
              "github_id": authData.github_id,
            },
          });

          const memberInfo = await member.create(
            {
              platform_id: platformResult.id,
              user_id: userInfo.id,
              access_state:false
            },
            {
              transaction: t
            }
          );

          const data = {
            githubLink,
            email: userInfo.email,
            age: userInfo.age,
            annual: userInfo.annual,
            member_id: memberInfo.id,
            socket_id: socket.id
          };
          socket.to(`room${roomId}`).emit("incommingReq", data);
        });

      }
      catch(err){
        console.log("--------------------------Error occurred in /socketServer/index.js--------------------------");
      }
    });

    //요청 client가 요청한 링크 공유를 방장 client가 허가할 때 발생하는 이벤트
    socket.on("acceptClient", async (socketId, roomId, memberId) => {
      try{
        await member.update(
          {
            access_state: true
          },
          {
            where: {id:memberId}
          }
        );
        socket.to(socketId).emit("acceptReq", roomId);
      }
      catch(err){
        console.log("--------------------------Error occurred in /socketServer/index.js--------------------------");
      }
    });
  })
}