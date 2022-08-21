export const getCSToDos = (req, res) => {
  return res.send("cs 할일이 많아요~");
};
export const getCSDones = (req, res) => {
  return res.send("cs 완료된 일을 늘려요~");
};

export const getCSTodoItem = (req, res) => {
  return res.send(`${req.params.trackingnum}을 조회합니다`);
};

export const updateCSTodoItem = (req, res) => {
  return res.send(`${req.params.trackingnum}을 재배송완료했다고 처리합니다`);
};
