const a = req => ({
  code: 0,
  data: req.body
})

a.method = 'post'
module.exports = a