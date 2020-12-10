const { postReview, getReview } = require('../access/review')
const { getProfileByUserId } = require('../access/common');

const postReviewAPI = async (req, res) => {
  const { sub, teacher_profile_id, rating, comment } = req.body;
  const profile = await getProfileByUserId(sub);
  await postReview(teacher_profile_id, profile.id, rating, comment);
  res.status(200).json({
    status: "OK"
  })
}

const getReviewAPI = async (req, res) => {
  const { profile_id } = req.query
  console.log({ profile_id });
  const reviews = await getReview(profile_id)
  const response = reviews.map(item => {
    return {
      reviewer: {
        name: `${item.first_name} ${item.last_name}`,
        avatar: `${item.avatar}`
      },
      rating: item.rating,
      comment: item.comment
    }
  })
  res.status(200).json({
    status: "OK",
    reviews: response
  })
}

module.exports = {
  postReviewAPI,
  getReviewAPI
}