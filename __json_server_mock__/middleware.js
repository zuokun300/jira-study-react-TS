module.exports = (req, res, next) => {
  if (req.path === "/login" && req.method === "POST") {
    if (req.body.username === "zk" && req.body.password === "123456") {
      return res.status(200).json({
        user: {
          token: "balabala1234",
        },
      });
    } else {
      return res.status(400).json("用户名或者密码错误");
    }
  }
  next();
};
