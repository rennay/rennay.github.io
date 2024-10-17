# View Kinesis Video Stream

## AWS Console
1. Open the Kinesis Video Streams console.

2. Choose the **Stream name** of the stream you created.

The video stream that is sent from the Raspberry Pi appears in the console.

When the stream is playing, you can experiment with the following features of the Kinesis Video Streams console:

- In the Video preview section, use the navigation controls to rewind or fast-forward the stream.

- In the Stream info section, notice the codec, resolution, and bitrate of the stream. The resolution and bitrate values are set purposefully low on the Raspberry Pi to minimize bandwidth usage for this tutorial. To view the Amazon CloudWatch metrics that are being created for your stream, choose View stream metrics in CloudWatch.

## References
- [Stream video to your Kinesis video stream and view the live stream](https://docs.aws.amazon.com/kinesisvideostreams/latest/dg/producersdk-cpp-rpi-run.html)