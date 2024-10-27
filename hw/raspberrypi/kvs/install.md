# Install Amazon Kinesis Video Streams (KVS)

```bash
cd
```

```bash
sudo apt-get install git cmake
```

To download run the following command:

```bash
git clone https://github.com/awslabs/amazon-kinesis-video-streams-producer-sdk-cpp.git
```

Prepare a build directory in the newly checked out repository:

```bash
mkdir -p amazon-kinesis-video-streams-producer-sdk-cpp/build
```

```bash
cd amazon-kinesis-video-streams-producer-sdk-cpp/build
```

On Ubuntu and Raspberry Pi OS you can get the libraries by running:

```bash
sudo apt-get install libssl-dev libcurl4-openssl-dev liblog4cplus-dev libgstreamer1.0-dev libgstreamer-plugins-base1.0-dev gstreamer1.0-plugins-base-apps gstreamer1.0-plugins-bad gstreamer1.0-plugins-good gstreamer1.0-plugins-ugly gstreamer1.0-tools
```

### Buster & Bookworm
```bash
sudo apt install -y autoconf automake libtool build-essential
```

### Bookworm

[Unable to stream](https://github.com/awslabs/amazon-kinesis-video-streams-producer-sdk-cpp/issues/10)

```bash
./kvs_gstreamer_sample: error while loading shared libraries: libssl.so.1.1: cannot open shared object file: No such file or director
sudo apt install -y libssl1.1

-- for the camera stream
Buffer pool activation failed
sudo rpi-update
```

*Note*:
- Was able to stream a local mp4 but not from camera
- This is a really good [gstream reference](https://github.com/awslabs/amazon-kinesis-video-streams-producer-sdk-cpp/blob/master/docs/raspberry-pi.md)

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
