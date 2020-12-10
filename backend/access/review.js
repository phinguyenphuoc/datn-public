const { query } = require('../config')

const postReview = (teacher_id, student_id, rating, comment) => {
  return new Promise((resolve, reject) => {
    query(
      `INSERT INTO public.review(teacher_profile_id, reviewer_id, rating, comment, created_at)
      VALUES($1,$2,$3,$4, CURRENT_TIMESTAMP(2)) RETURNING *`,
      [teacher_id, student_id, rating, comment],
      (err, results) => {
        if (err) {
          console.log(err)
          reject(err)
        } else {
          console.log("results.rows[0]", results.rows[0])
          resolve(results.rows[0])
        }
      }
    )
  })
}

const getReview = (profile_id) => {
  return new Promise((resolve, reject) => {
    query(
      `SELECT r.comment, r.rating, 
      p.first_name,
      p.last_name,
      p.avatar
      FROM public.review as r
      INNER JOIN public.profile as p ON r.reviewer_id = p.id
      WHERE r.teacher_profile_id = $1`,
      [profile_id],
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

module.exports = {
  postReview,
  getReview
}