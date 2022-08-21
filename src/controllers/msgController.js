export const getDeliveryToDos = (req, res) => {
  return res.send("msg 할일이 많아요~");
};
export const getDeliveryDones = (req, res) => {
  return res.send("msg 완료된 일을 늘려요~");
};

export const getDeliveryToDoItem = (req, res) => {
  return res.send(`${req.params.trackingnum}을 조회합니다.`);
};

export const updateDeliveryToDoItem = (req, res) => {
  return res.send(`${req.params.trackingnum}을 배송완료 처리합니다.`);
};
