# Detect Text (CLI, NodeJS, Python)

## Command Line

```bash
aws rekognition detect-text \
--image \
'{"S3Object":{"Bucket":"test-bucket-architecing-on-aws-za-17082022","Name":"image_red_light.jpg"}
```

## NodeJS - S3 reference

```javascript
// Import the AWS SDK
const AWS = require('aws-sdk');

// Configure the AWS SDK with the appropriate region (can also be set via aws configure)
AWS.config.update({ region: 'us-east-1' }); // Set your AWS region here

// Create a Rekognition client
const rekognition = new AWS.Rekognition();

// Function to detect text in an image
const detectTextInImage = async (bucketName, imageName) => {
    // Rekognition API parameters
    const params = {
        Image: {
            S3Object: {
                Bucket: bucketName, // Name of the S3 bucket
                Name: imageName     // Image file name in the S3 bucket
            }
        }
    };

    try {
        // Call Rekognition's detectText method
        const response = await rekognition.detectText(params).promise();

        // Log the detected text details
        console.log('Detected Text:', response.TextDetections);
        return response.TextDetections;
    } catch (error) {
        console.error('Error detecting text:', error);
        throw error;
    }
};

// Example usage
const bucketName = 'test-bucket-architecing-on-aws-za-17082022';  // Replace with your S3 bucket name
const imageName = 'image_red_light_1024_768.jpg';   // Replace with the image file name

detectTextInImage(bucketName, imageName)
    .then(detectedText => {
        detectedText.forEach(text => {
            console.log(`Detected: ${text.DetectedText} - Confidence: ${text.Confidence}%`);
        });
    })
    .catch(error => console.error(error));
```

## NodeJS - Local file

```javascript
// Import the AWS SDK and fs module
const AWS = require('aws-sdk');
const fs = require('fs');

// Configure the AWS SDK with your region
AWS.config.update({ region: 'us-east-1' });  // Set your AWS region here

// Create a Rekognition client
const rekognition = new AWS.Rekognition();

// Function to detect text in a local image file
const detectTextInLocalImage = async (imageFilePath) => {
    // Read the image file from the local filesystem
    const imageBytes = fs.readFileSync(imageFilePath);

    // Rekognition API parameters
    const params = {
        Image: {
            Bytes: imageBytes // Pass the image bytes directly
        }
    };

    try {
        // Call Rekognition's detectText method
        const response = await rekognition.detectText(params).promise();

        // Log the detected text details
        console.log('Detected Text:', response.TextDetections);
        return response.TextDetections;
    } catch (error) {
        console.error('Error detecting text:', error);
        throw error;
    }
};

// Example usage
const imageFilePath = '/Users/rennayd/Downloads/sample_image_coffee.png';  // Replace with your local image path

detectTextInLocalImage(imageFilePath)
    .then(detectedText => {
        detectedText.forEach(text => {
            console.log(`Detected: ${text.DetectedText} - Confidence: ${text.Confidence}%`);
        });
    })
    .catch(error => console.error(error));
```

## Python (with bounding boxes)
```python
import boto3
from PIL import Image, ImageDraw

session = boto3.Session(profile_name='default')
rekognition = session.client('rekognition')

# Function to detect text in an image
def detect_text(image_path):
    with open(image_path, 'rb') as image_file:
        image_bytes = image_file.read()

    response = rekognition.detect_text(Image={'Bytes': image_bytes})
    return response['TextDetections']

# Function to draw bounding boxes on the image
def draw_bounding_boxes(image_path, text_detections):
    image = Image.open(image_path)
    draw = ImageDraw.Draw(image)

    for text_detection in text_detections:
        if text_detection['Type'] == 'WORD':
            box = text_detection['Geometry']['BoundingBox']
            width, height = image.size
            left = box['Left'] * width
            top = box['Top'] * height
            width = box['Width'] * width
            height = box['Height'] * height
            draw.rectangle([(left, top), (left + width, top + height)], outline=(255, 0, 0), width=2)

    image.save('/Users/rennayd/Downloads/annotated_image.jpg')

# Example usage
image_path = '/Users/rennayd/Downloads/image_red_light_1024_768.jpg'
text_detections = detect_text(image_path)
draw_bounding_boxes(image_path, text_detections)
```
