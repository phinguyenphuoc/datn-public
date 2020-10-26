const { query } = require('../config')

const getAllInstruments = () => {
  return new Promise((resolve, reject) => {
    query(
      `SELECT * FROM instrument`,
      (err, results) => {
        if (err) {
          console.log(err)
          reject(err)
        } else {
          resolve(results.rows)
        }
      }
    )
  })
}

const instrumentsApi = async (req, res) => {
  await getAllInstruments()
    .then(results => {
      res.send({
        status: "OK",
        instruments: results
      })
    })
}
module.exports = instrumentsApi