const postAssistance = require('../access/assistance')
const { getProfileByUserId } = require('../access/common')

const postAssistanceAPI = async (req, res) => {
    const { sub, assistance } = req.body;
    const profile = await getProfileByUserId(sub)
    await postAssistance(profile.id, assistance.message)
    res.status(200).json({
        status: "OK"
    })
}

module.exports = postAssistanceAPI