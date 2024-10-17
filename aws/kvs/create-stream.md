# Create KVS Stream

## Create a video stream using the console
1. Open the console at https://console.aws.amazon.com/kinesisvideo/home.

2. On the **Video streams page**, choose **Create video stream**.

3. On the **Create a new video stream** page, enter *YourStreamName* for the stream name. Leave the **Default configuration** button selected.

4. Choose **Create video stream**.

5. After Amazon Kinesis Video Streams creates the stream, review the details on the *YourStreamName* page.

## Create a video stream using the AWS CLI

Run the following Create-Stream command in the AWS CLI:
```bash
aws kinesisvideo create-stream \
    --stream-name YourStreamName \
    --data-retention-in-hours 24
```

### Verify the stream

```bash
aws kinesisvideo describe-stream --stream-name YourStreamName
```

### List all streams

```bash
aws kinesisvideo list-streams
```

## References

- [Kinesis Video Streams (KVS) RTSP Stream Part 1 - Ingestion from RTSP cameras (Tutorial)](https://youtu.be/YoOYTCD_v3Q?si=qgHjm-e0Dhf9mPVO) - Paul Shiner
- [Create an Amazon Kinesis video stream](https://docs.aws.amazon.com/kinesisvideostreams/latest/dg/gs-createstream.html)