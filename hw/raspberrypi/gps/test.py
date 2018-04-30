#!/usr/bin/python

import json
from gps3 import gps3 
from google.cloud import pubsub_v1
from dateutil.parser import parse
from datetime import datetime
import pytz

if __name__ == '__main__':
    print('Hello world..')
    publisher = pubsub_v1.PublisherClient()
    topic_path = publisher.topic_path('newfriendlychat-63187','my-valuation-topic')

    gps_socket = gps3.GPSDSocket()
    data_stream = gps3.DataStream()
    gps_socket.connect()
    gps_socket.watch()
    old_time = datetime.utcnow().replace(tzinfo=pytz.UTC)
    for new_data in gps_socket:
	  if new_data:
	  	data_stream.unpack(new_data)
	 	#print('Altitude = ', data_stream.TPV['alt'])
	 	#print('Latitude = ', data_stream.TPV['lat'])
		data = {"altitude":data_stream.TPV['alt'], "latitude":data_stream.TPV['lat'], "longitude":data_stream.TPV['lon'], "speed":data_stream.TPV['speed'],"time":data_stream.TPV['time']}
		#print(data_stream.TPV['time'])
		if (data_stream.TPV['time'] != 'n/a'):
			new_time = parse(data_stream.TPV['time'])

			diff_time = new_time - old_time
			if (diff_time.total_seconds() >= 10):
				old_time = new_time
				print new_time, '-', data
				json_string = json.dumps(data)
				json_string = json_string.encode('utf-8')
				publisher.publish(topic_path, data=json_string)


	
