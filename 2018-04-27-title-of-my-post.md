**bold**

[Markdown Cheat Sheet](http://packetlife.net/media/library/16/Markdown.pdf)

## Hardware Setup

* Arduino

![Alt text](/sigfox/images/arduino.png "Arduino Uno")

*  Swidnet Unashield

![Alt text](/sigfox/images/unashield_top.png "Unashield Top")

![Alt text](/sigfox/images/unashield_bottom.png "Unashield Bottom")

*  Arduino + Unashield

![Alt text](/sigfox/images/arduino_unashield.png "Arduino + Unashield")

*  Arduino + Unashield + USB

![Alt text](/sigfox/images/arduino_unashield_usb.png "Arduino + Unashield + USB")

## Sigfox/Swidnet Setup

*  Device Registration

** [Sigfox Device Registration](https://unabiz.github.io/unashield)

** Log into [Sigfox Backend](https://backend.sigfox.com)

** [Check Device](https://backend.sigfox.com/device/list)

![Alt text](/sigfox/images/backend_sigfox_device_list "Sigfox Backend Device List")

## Arduino Setup

*  Install IDE

** [Arduino IDE](https://www.arduino.cc/en/Main/Software)

* Blink an LED

** [Blink Tutorial](https://www.arduino.cc/en/tutorial/blink)

* Turn on LED

<code>
void loop() {
  digitalWrite(LED_BUILTIN, HIGH);   // turn the LED on (HIGH is the voltage level)
  delay(1000);                       // wait for a second
//  digitalWrite(LED_BUILTIN, LOW);    // turn the LED off by making the voltage LOW
//  delay(1000);                       // wait for a second
}
</code>

* Turn off LED

<code>
void loop() {
//  digitalWrite(LED_BUILTIN, HIGH);   // turn the LED on (HIGH is the voltage level)
//  delay(1000);                       // wait for a second
  digitalWrite(LED_BUILTIN, LOW);    // turn the LED off by making the voltage LOW
  delay(1000);                       // wait for a second
}
</code>





