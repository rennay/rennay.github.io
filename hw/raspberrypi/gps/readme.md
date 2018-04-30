
**install.sh**
~~~~
#!/bin/bash

sudo apt-get update -y
sudo apt-get upgrade -y
sudo apt-get install screen -y
sudo apt-get install ppp -y
sudo apt-get install wvdial -y
sudo apt-get install git -y
#sudo apt-get install python3 -y
sudo apt-get install python-pip -y
#sudo apt-get install virtualenv -y

mkdir repos
cd repos
git clone https://rennay:Pseudo957@bitbucket.org/rennay/myrepo.git
cd myrepo
sudo cp wvdial.conf /etc
chmod +x run.sh
sudo pip install -r requirements.txt
sudo easy_install picamera
~~~~

**rungps.sh**
~~~~
#!/bin/bash -x

sudo wvdial play &
WVDIAL_PID=$!
echo Process ID: $WVDIAL_PID

sudo systemctl stop gpsd.socket
sudo systemctl disable gpsd.socket
sudo gpsd /dev/ttyAMA0 -F /var/run/gpsd.sock
sudo -E python /root/test.py
~~~~

**test.py**

~~~~
pi@raspberrypi:~ $ ./rungps.sh 
+ WVDIAL_PID=579
+ echo Process ID: 579
Process ID: 579
+ sudo systemctl stop gpsd.socket
+ sudo wvdial play
+ sudo systemctl disable gpsd.socket
--> WvDial: Internet dialer version 1.61
--> Cannot open /dev/ttyUSB0: No such file or directory
--> Cannot open /dev/ttyUSB0: No such file or directory
--> Cannot open /dev/ttyUSB0: No such file or directory
+ sudo gpsd /dev/ttyAMA0 -F /var/run/gpsd.sock
+ sudo -E python /root/test.py
Hello world..
2018-04-30 06:06:38+00:00 - {'latitude': -26.03267323, 'altitude': 1497.794, 'speed': 0.134, 'longitude': 28.092393375, 'time': u'2018-04-30T06:06:38.000Z'}
2018-04-30 06:06:48+00:00 - {'latitude': -26.032675559, 'altitude': 1496.013, 'speed': 0.065, 'longitude': 28.092374661, 'time': u'2018-04-30T06:06:48.000Z'}
~~~~