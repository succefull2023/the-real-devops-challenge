CHALLENGE’S SOLUTIONS

There was compilation errors in the code and here is how i solve them:
- In mongoflask.py: Remove the parameter JSONEncoder from class MongoJSONEncoder. Also remove the related import
  The import of JSONEncoder is causing compilation error (ImportError: cannot import name 'JSONEncoder' from 'flask'). 
  As JSONEncoder  is not used in MongoJSONEncoder, we can remove it without breaking the code.
  
- In function find_restaurants(mongo, _id=None): There was and error causing http 204 for API /api/v1/restaurant/{id}
   To correct the error: change query["_id"] = ObjectId(id) by query["_id"] = _id (Line 29)
 
 
1- SOLUTION CHALLENGE 1:

 Here is how i proceed to solve the first challenge:
- In fuction restaurant(id) (file app.py): 
  i used the len() function to check the size of array restaurants (from line 29 to 31).
   if array restaurants is empty (ie len=0), i return a http 204 (No content) using the make_response function
   else, i return the element of arrays restaurants (There only one json in that array. That json will the one return as response)
- In function restaurants(): 
  i also use the len() function to check the size of array restaurants and return http 204 (No content) if the array is empty (from line 21 to 22)


3- SOLUTION CHALLENGE 3:
For this step i created a Dockerfile  for the python-application 
Please refer to the file i commited to my github repository
https://github.com/succefull2023/the-real-devops-challenge/blob/master/Dockerfile

4- SOLUTION CHALLENGE 4:
Here is the Dockerfile i created for the database
https://github.com/succefull2023/the-real-devops-challenge/blob/master/db-docker/Dockerfile

In orther to init the database, i created the init-data.js file containig the mongodb query to insert data in the restaurant collection at the container startup.
In the Dockerfile, i copy the js file to the /docker-entrypoint-initdb.d/ folder (all js files present in that folder are loaded at mongodb container startup) 
here is the init-data.js file: https://github.com/succefull2023/the-real-devops-challenge/blob/master/db-docker/init-data.js

NB: to connect the app_food container and mongodb container, i ran them in the same network
	- create a network using the command: docker network create mynetwork
	- run each container adding option --network mynetwork (to include them in the network mynetwork)
	
5- SOLUTION CHALLENGE 5:

The app-food and the database have been docker composed using the following file:
https://github.com/succefull2023/the-real-devops-challenge/blob/master/docker-compose.yml 
 - I'm using a volume mapping to mount the ./db-docker/init-data.js file from the host system to /docker-entrypoint-initdb.d/init-data.js inside the container in read-only mode.  
 - The volume in this docker-compose is used in such away that if the containers are stopped the data does not disappear
 
 NB: When a container is started for the first time it will execute files with extensions .sh and .js that are found in /docker-entrypoint-initdb.d. 

6- SOLUTION CHALLENGE 6:

I used minikube to deploy the python-app with the database in kubernetes
  
  6.1. The app_food deployment file (https://github.com/succefull2023/the-real-devops-challenge/blob/master/deployment_app_food.yml)
	In the deployment_app_food.yml file, i'm using the secret docker-hub-secret as imagePullSecrets to pull the image from my dockerhub repository.
	here are the steps i fllowed to create the docker-hub-secret secret:
	* From the console, use the docker login command to login to my docker repository
	  The login process creates or updates the config.json file that holds the docker authorization token
	* then, use the following command to create the secret	
	  kubectl create secret generic docker-hub-secret --from-file=.dockerconfigjson=~/.docker/config.json --type=kubernetes.io/dockerconfigjson
      	
  6.2 The mongo.yaml file (https://github.com/succefull2023/the-real-devops-challenge/blob/master/mongo.yaml)
    In the mongo.yaml file, the database is initialized with some data using the configMap create-db-configmap
	Here is the command i ran to create the configMap
	   kubectl create configmap create-db-configmap --from-file=./create_db.js
	in that command, i'm using the following js file where a mongoDb query is executed to insert 3 datas in the restaurant collection, at the container startup
	https://github.com/succefull2023/the-real-devops-challenge/blob/master/create_db.js
 
  6.3 The mongo-config.yaml (https://github.com/succefull2023/the-real-devops-challenge/blob/master/mongo-config.yaml)
    In the app_food deployment yml, the value of MONGO_URI environment variable is coming from a configMap called mongo-config, using the key mongo-url
	The above mongo-config.yaml file is used to create the mongo-config configMap


NB: The whole challenge solution can be found in my following github repository
https://github.com/succefull2023/the-real-devops-challenge



                                                  THANKS