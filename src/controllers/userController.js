export const getOrderItems = (req, res) => {
  return res.json({
    orderNum: 1232134,
    name: "천예지",
  });
};

export const getOrdernumItem = (req, res) => {
  return res.json(`${req.params.ordernum}을 조회합니다`);
};

export const setCSOrdernumItem = (req, res) => {
  return res.send(`${req.params.ordernum} 내역에 CS를 접수합니다.`);
};
