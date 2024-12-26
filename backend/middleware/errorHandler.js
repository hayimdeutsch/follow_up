export default (err, req, res, next) => {
  const sc = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  console.log("err", err);
  res.status(sc).json({ message });
};
