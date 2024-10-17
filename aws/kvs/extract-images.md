# Extract images from Kinesis Video Streams

## Options only available from CLI

[This operation isn't currently supported in the Kinesis Video Streams AWS Management Console.](https://docs.aws.amazon.com/kinesisvideostreams-webrtc-dg/latest/devguide/configure-ingestion.html)

## CLI Skeleton
```bash
aws kinesisvideo update-image-generation-configuration --generate-cli-skeleton
```

```json
{
    "StreamName": "",
    "StreamARN": "",
    "ImageGenerationConfiguration": {
        "Status": "ENABLED",
        "ImageSelectorType": "SERVER_TIMESTAMP",
        "DestinationConfig": {
            "Uri": "",
            "DestinationRegion": ""
        },
        "SamplingInterval": 0,
        "Format": "JPEG",
        "FormatConfig": {
            "KeyName": ""
        },
        "WidthPixels": 0,
        "HeightPixels": 0
    }
}
```

## Example configuration
```json
{
  "StreamName": "NicStream",
  "ImageGenerationConfiguration": {
    "Status": "ENABLED",
    "DestinationConfig": {
      "DestinationRegion": "us-east-1",
      "Uri": "s3://test-bucket-architecing-on-aws-za-17082022/camera_102"
    },
    "SamplingInterval": 3000,
    "ImageSelectorType": "PRODUCER_TIMESTAMP",
    "Format": "JPEG",
    "FormatConfig": {
      "JPEGQuality": "80"
    },
    "WidthPixels": 640,
    "HeightPixels": 480
  }
}
```

```bash
aws kinesisvideo update-image-generation-configuration --cli-input-json file://./update-image-generation-configuration.json
```

```bash
aws kinesisvideo describe-image-generation-configuration --stream-name NicStream
```

## IAM Configuration
- Update policy to allow access to S3
- Without this, files will not be created in S3 bucket
```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "VisualEditor0",
            "Effect": "Allow",
            "Action": "kinesisvideo:*",
            "Resource": "*"
        },
        {
            "Sid": "Statement1",
            "Effect": "Allow",
            "Action": [
                "s3:*"
            ],
            "Resource": "*"
        }
    ]
}
```

## References
- [Kinesis Video Streams (KVS) RTSP Stream Part 2 - Image Extraction to S3 for Rekognition](https://youtu.be/pUvxI76YnfA?si=ybdD2UJqsAf-PzWg) - Paul Shiner
- [Amazon Kinesis Video Streams announces managed support for image extraction](https://aws.amazon.com/about-aws/whats-new/2022/05/amazon-kinesis-video-streams-announces-managed-support-image-extraction/)
- [Extract images from video streams](https://docs.aws.amazon.com/kinesisvideostreams/latest/dg/images.html)
