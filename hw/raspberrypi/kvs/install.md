# Install Amazon Kinesis Video Streams (KVS)

```bash
cd
```

To download run the following command:

```bash
git clone https://github.com/awslabs/amazon-kinesis-video-streams-producer-sdk-cpp.git
```

Prepare a build directory in the newly checked out repository:

```bash
mkdir -p amazon-kinesis-video-streams-producer-sdk-cpp/build`
```

```bash
cd amazon-kinesis-video-streams-producer-sdk-cpp/build
```

On Ubuntu and Raspberry Pi OS you can get the libraries by running:

```bash
sudo apt-get install libssl-dev libcurl4-openssl-dev liblog4cplus-dev libgstreamer1.0-dev libgstreamer-plugins-base1.0-dev gstreamer1.0-plugins-base-apps gstreamer1.0-plugins-bad gstreamer1.0-plugins-good gstreamer1.0-plugins-ugly gstreamer1.0-tools
```

To Include Building GStreamer Sample Programs

The GStreamer plugin and samples are NOT built by default. If you wish to build them you MUST add -DBUILD_GSTREAMER_PLUGIN=TRUE when running cmake:

```bash
cmake -DBUILD_GSTREAMER_PLUGIN=TRUE ..
```

After running cmake, in the same build directory run make:

```bash
make
```

## References

- [Amazon Kinesis Video Streams CPP Producer, GStreamer Plugin and JNI](https://github.com/awslabs/amazon-kinesis-video-streams-producer-sdk-cpp)
