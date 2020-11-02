const getS3 = () => {
    let s3;
    if (!s3) {
        const { AWS_ACCESS_KEY, AWS_SECRET_ACCESS_KEY } = process.env;

        const AWS = require("aws-sdk");

        AWS.config.update({ region: "us-east-2" });
        s3 = new AWS.S3({
            accessKeyId: AWS_ACCESS_KEY,
            secretAccessKey: AWS_SECRET_ACCESS_KEY
        });
    }

    return s3;
}

module.exports = getS3