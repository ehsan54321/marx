const UpdateApi = (req, res) => {
  console.log(req.body.data)
  const { password, email } = req.body
  res.status(200).json({ password, email })
}

export default UpdateApi
