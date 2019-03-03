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