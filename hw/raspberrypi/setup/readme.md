## Steps to commission a Raspberry Pi

* Download Raspbian Buster Lite - https://downloads.raspberrypi.org/raspbian_lite/images/raspbian_lite-2020-02-14/
* Unzip

* User Raspberry Pi Imager to write the image to a memory card.  I used a 16GB card.

* Set up username and WiFi so you can connect remotely

![Alt text](images/pi_imager_1.png "Pi Settings - General")

* Enable SSH

![Alt text](images/pi_imager_2.png "Pi Settings - Services")

* Start the imaging

![Alt text](images/pi_imager_3.png "Raspberry Pi Imager")

* Insert the memory card into the Pi and boot
* On the first boot, allow it time to run through the initial startup. Wait 5-10 minutes, even if you see a login prompt.

* `ssh rennay@192.168.1.106`

![Alt text](images/pi_ssh.png "SSH into Pi")

* `sudo apt-get update`

* As this is an older version of Raspbian, we will get an error when we try to update

![Alt text](images/pi_update_1.png "sudo-apt-get update (Error)")

* `sudo apt-get update --allow-releaseinfo-change`

![Alt text](images/pi_update_2.png "sudo-apt-get update (Allow ReleaseInfo)")

* Now run `sudo apt-get update`

![Alt text](images/pi_update_3.png "sudo-apt-get update (Success)")

* `sudo raspi-config`
  * Interfacing Options
    * P1 Camera
      * Would you like the camera interface to be enabled?
        * Yes
  * Finish
    * Reboot

* Test the camera
  * `raspistill -o test.jpg`
    * Confirm test.jpg has been created