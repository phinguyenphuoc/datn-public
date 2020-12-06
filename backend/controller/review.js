const { postReview } = require('../access/review')
const { getProfileByUserId } = require('../access/common');

const postReviewAPI = async (req, res) => {
  const { sub, teacher_profile_id, rating, comment } = req.body;
  const profile = await getProfileByUserId(sub);
  await postReview(teacher_profile_id, profile.id, rating, comment);
  res.status(200).json({
    status: "OK"
  })
}

module.exports = {
  postReviewAPI
}