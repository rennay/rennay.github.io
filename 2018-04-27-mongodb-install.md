## Steps to install Mongo DB

sudo adduser mongodb
sudo passwd mongodb
	P@ssw0rd
su mongodb
cd
mongodb-linux-x86_64-3.6.1.tar
tar xvf mongodb-linux-x86_64-3.6.1.tar
ln -s mongodb-linux-x86_64-3.6.1 mongodb
mkdir ~/mongodb/data

rm /home/mongodb/mongodb/data/mongod.lock

~/mongodb/bin/mongod --bind_ip 10.74.10.42 -dbpath ~/mongodb/data --replSet rsQA
~/mongodb/bin/mongod --bind_ip 10.74.10.43 -dbpath ~/mongodb/data --replSet rsQA
nohup ~/mongodb/bin/mongod --bind_ip 10.74.11.32 --port 27017 -dbpath ~/mongodb/data --replSet rs4

Mongo Replica Set

Primary
./mongod --config --bind_ip 10.74.10.42 --replSet rsQA
./mongo 10.58.187.26

cfg = {"_id" : “rs1”, "members" : [{"_id" : 0,"host" : "[Primary_Host_IP]:27017"}]}
rs.initiate()
rs.conf()
rs.status()

Nodes
nohup ./mongod --bind_ip 10.58.179.17 --replSet rs0 &
rs.add("10.58.187.26:27017")

nohup ./mongod --bind_ip 10.58.179.18 --replSet rs0 &
rs.add("10.58.179.18:27017")

nohup ~/mongodb/bin/mongod --bind_ip 10.58.187.26 -dbpath ~/mongodb/data --replSet rsQA &
nohup ~/mongodb/bin/mongod --bind_ip 10.58.187.27 -dbpath ~/mongodb/data --replSet rsQA &