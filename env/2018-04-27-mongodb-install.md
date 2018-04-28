## Steps to install Mongo DB

- Create a mongodb user

~~~~
sudo adduser mongodb
sudo passwd mongodb
	P@ssw0rd
su mongodb
cd
~~~~

- Download the binaries from the [MongDB Download Center](https://www.mongodb.com/download-center#atlas) or to download the latest release through shell, issue the following:

~~~~
curl -O https://fastdl.mongodb.org/linux/mongodb-linux-x86_64-3.6.1.tgz
~~~~

- Extract the files from the downloaded archive

~~~~
tar zxvf mongodb-linux-x86_64-3.6.1.tar.tgz
~~~~

- Copy the extracted archive to the target directory

~~~~
ln -s mongodb-linux-x86_64-3.6.1 mongodb
~~~~

- Create the data directory

~~~~
mkdir ~/mongodb/data
~~~~

- If you had a previous installation:

~~~~
rm /home/mongodb/mongodb/data/mongod.lock
~~~~

- Single Instance

~~~~
nohup ~/mongodb/bin/mongod --bind_ip 10.74.11.32 --port 27017 -dbpath ~/mongodb/data &
~~~~

- Mongo Replica Set

- On Primary:

~~~~
./mongod --config --bind_ip 10.74.10.42 --replSet rsQA
./mongo 10.58.187.26

cfg = {"_id" : “rs1”, "members" : [{"_id" : 0,"host" : "[Primary_Host_IP]:27017"}]}
rs.initiate()
rs.conf()
rs.status()
~~~~

- On Each Node:

~~~~
nohup ./mongod --bind_ip 10.58.179.17 --replSet rsQA &
rs.add("10.58.187.26:27017")

nohup ./mongod --bind_ip 10.58.179.18 --replSet rsQA &
rs.add("10.58.179.18:27017")

nohup ~/mongodb/bin/mongod --bind_ip 10.58.187.26 -dbpath ~/mongodb/data --replSet rsQA &
nohup ~/mongodb/bin/mongod --bind_ip 10.58.187.27 -dbpath ~/mongodb/data --replSet rsQA &
~~~~

