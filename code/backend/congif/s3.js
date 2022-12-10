//AWS s3 buckets confgiuration

require('dotenv').config()
const fs = require('fs')
const S3 = require('aws-sdk/clients/s3')

const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_BUCKET_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY
const secretAccesskey = process.env.AWS_SECRET_KEY

const s3 = new S3({
    region,
    accessKeyId,
    secretAccesskey
})

//downloads a file from S3
function getFileStream(fieldKey){
    const downloadParams = {
        Key: fieldKey,
        Bucket: bucketName
    }

    return s3.getObject(downloadParams).createReadStream()

}
exports.getFileStream = getFileStream