export default (err, req, res, next) => {
  const sc = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  console.log(err);
  console.log(err.stack);
  console.log(err?.originalError);
  res.status(sc).json({ message });
};
