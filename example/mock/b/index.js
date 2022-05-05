module.exports = req => ({
  code: 0,
  body: req.body,
  query: req.query,
  path: req.path
})