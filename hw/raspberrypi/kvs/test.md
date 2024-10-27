# Test Amazon Kinesis Video Streams (KVS) from Raspberry Pi

## Get Credentials using STS

- Retrieve credentials using [AWS STS (AWS Security Token Service)](../../../aws/iam/sts.md)

## Configure environment

Setup your environment with your AWS account credentials and AWS region:

```bash
export GST_PLUGIN_PATH=Directory Where You Cloned the SDK/amazon-kinesis-video-streams-producer-sdk-cpp/build
export AWS_DEFAULT_REGION=AWS Region i.e. us-east-1
export AWS_ACCESS_KEY_ID=Access Key ID
export AWS_SECRET_ACCESS_KEY=Secret Access Key
export AWS_SESSION_TOKEN=Session Token
```

## Debug Level
```bash
export AWS_KVS_LOG_LEVEL=2
```

## Using local mp4

- Download mp4

```bash
wget https://awsj-iot-handson.s3-ap-northeast-1.amazonaws.com/kvs-workshop/sample.mp4
```

- Stream

```bash
./kvs_gstreamer_sample

 Usage: AWS_ACCESS_KEY_ID=SAMPLEKEY AWS_SECRET_ACCESS_KEY=SAMPLESECRET ./kinesis_video_gstreamer_sample_app my-stream-name -w width -h height -f framerate -b bitrateInKBPS
 ```

```bash
./kvs_gstreamer_sample [YourStreamName] [mp4]
```

```bash
./kvs_gstreamer_sample NicStream ./sample.mp4
```

## Using camera

```bash
./kvs_gstreamer_sample [YourStreamName]
```

### Example

```bash
./kvs_gstreamer_sample NicStream
```

## Specify resolution

```bash
./kvs_gstreamer_sample YourStreamName [YourStreamName] - w [width] -h [height]
```

### Example

```bash
./kvs_gstreamer_sample YourStreamName NicStream -w 1024 -h 768
```

## References
1. [Send data to an Amazon Kinesis video stream](https://docs.aws.amazon.com/kinesisvideostreams/latest/dg/gs-send-data.html)