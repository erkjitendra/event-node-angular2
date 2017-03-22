1. go in these three file directory on terminal(file are in Raw Data directory)
	>>events.json
	>>category.json
	>>userAdmin.json
2. run these command for data insert in mongodb
	1. sudo mongoimport --db event_dbs --collection events --file events.json
	2. sudo mongoimport --db event_dbs --collection categories --file categories.json
	3. sudo mongoimport --db event_dbs --collection users --file admin.json
3. use admin file data to login as admin 

