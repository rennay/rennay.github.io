**bold**

[Markdown Cheat Sheet](http://packetlife.net/media/library/16/Markdown.pdf)

## Hardware Setup

* Arduino

![Alt text](/sigfox/images/arduino.png "Arduino Uno")

*  Sqwidnet Unashield

![Alt text](/sigfox/images/unashield_top.png "Unashield Top")

![Alt text](/sigfox/images/unashield_bottom.png "Unashield Bottom")

*  Arduino + Unashield

![Alt text](/sigfox/images/arduino_unashield.png "Arduino + Unashield")

*  Arduino + Unashield + USB

![Alt text](/sigfox/images/arduino_unashield_usb.png "Arduino + Unashield + USB")

## Sigfox/Sqwidnet Setup

*  Device Registration

** [Sigfox Device Registration](https://unabiz.github.io/unashield)

** Log into [Sigfox Backend](https://backend.sigfox.com)

** [Check Device](https://backend.sigfox.com/device/list)

![Alt text](/sigfox/images/backend_sigfox_device_list "Sigfox Backend Device List")

## Arduino Setup

*  Install IDE

** [Arduino IDE](https://www.arduino.cc/en/Main/Software)

* Blink an LED

** Compile/Verify the following code from [Blink Tutorial](https://www.arduino.cc/en/tutorial/blink)

<code>
/*
  Blink

  Turns an LED on for one second, then off for one second, repeatedly.

  Most Arduinos have an on-board LED you can control. On the UNO, MEGA and ZERO
  it is attached to digital pin 13, on MKR1000 on pin 6. LED_BUILTIN is set to
  the correct LED pin independent of which board is used.
  If you want to know what pin the on-board LED is connected to on your Arduino
  model, check the Technical Specs of your board at:
  https://www.arduino.cc/en/Main/Products

  modified 8 May 2014
  by Scott Fitzgerald
  modified 2 Sep 2016
  by Arturo Guadalupi
  modified 8 Sep 2016
  by Colby Newman

  This example code is in the public domain.

  http://www.arduino.cc/en/Tutorial/Blink
*/

// the setup function runs once when you press reset or power the board
void setup() {
  // initialize digital pin LED_BUILTIN as an output.
  pinMode(LED_BUILTIN, OUTPUT);
}

// the loop function runs over and over again forever
void loop() {
  digitalWrite(LED_BUILTIN, HIGH);   // turn the LED on (HIGH is the voltage level)
  delay(1000);                       // wait for a second
  digitalWrite(LED_BUILTIN, LOW);    // turn the LED off by making the voltage LOW
  delay(1000);                       // wait for a second
}
</code>

** Upload

** Check device - you should see a flashing LED

* Turn on LED

** Make the following code change:

<code>
void loop() {
  digitalWrite(LED_BUILTIN, HIGH);   // turn the LED on (HIGH is the voltage level)
  delay(1000);                       // wait for a second
//  digitalWrite(LED_BUILTIN, LOW);    // turn the LED off by making the voltage LOW
//  delay(1000);                       // wait for a second
}
</code>

** Upload

** Check device - LED should be on

* Turn off LED

** Make the following code change:

<code>
void loop() {
//  digitalWrite(LED_BUILTIN, HIGH);   // turn the LED on (HIGH is the voltage level)
//  delay(1000);                       // wait for a second
  digitalWrite(LED_BUILTIN, LOW);    // turn the LED off by making the voltage LOW
  delay(1000);                       // wait for a second
}
</code>

** Upload

** Check device - LED should be off

## Send message to Sigfox/Sqwidnet

** Compile/Verify the following code fro

* Upload

<code>
#include <SoftwareSerial.h>

#define TX 4
#define RX 5

SoftwareSerial sigfox(RX,TX);

void setup()
{
sigfox.begin(9600); // Initalise Serial connection
sigfox.write("AT$SF=950e1400b051170094592100\r"); // Serial write to Sigfox Module
}

void loop(){}
</code>

* Lights should flash on Unashield board

* Verify the message has been received in [Sigfox Backend Messages](https://backend.sigfox.com/device/{deviceID}/messages).  

![Alt text](/sigfox/images/backend_sigfox_device_list.png "Sigfox Backend Messages")

** Note that the timestamp in the portal appears to be GMT.

** Verify the data in your Arduino IDE is the same as the one in the Sigfox Backend

## Configure a Callback

* Expose an HTTP GET service or an HTTP POST service (using Google Cloud Functions)

* Navigate to [CallBacks in Sigfox Backend Portl](https://backend.sigfox.com/devicetype/5965425b9e93a178a1b19843/callbacks)

* For HTTP GET

** Update URL pattern as follows
<code>
https://YOUR_SERVER_ADDRESS/addMessage?device={device}&time={time}&data={data}&lat={lat}&lng={lng}&station={station}
</code>

* For HTTP POST

** Update URL pattern as follows
<code>
https://YOUR_SERVER_ADDRESS/addMessage
</code>

** Update Content type
<code>
application/json
</code>

** Update Body
<code>
 {
    "device" : "{device}",
    "data" : "{data}",
    "station" : "{station}",
    "lat" : "{lat}",       
    "lng" : "{lng}",       
    "time" : {time}
 }
</code>

## Putting it all together

* Arudino IDE

** Change data in Arudino IDE and upload/run Sketch

![Alt text](/sigfox/images/arduino_sketch.png "Arduino Sketch")

* Sigfox Backend

** Verify message has been received in backend.sigfox.com

![Alt text](/sigfox/images/backend_sigfox_message_list.png "Arduino Sketch")

** Verify Callback Executed OK

* Google Cloud

** Verify message received

![Alt text](/sigfox/images/google_cloud_fn_log.png "Google Cloud Functions Log")