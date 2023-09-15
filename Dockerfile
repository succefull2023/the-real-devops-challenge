FROM python:3.9-slim-buster
RUN apt-get update
WORKDIR /code
COPY ./requirements.txt /code/requirements.txt
RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt
RUN mkdir -p /code/appfood
COPY ./app.py /code/appfood/app.py
COPY ./data/ /code/appfood/data/
COPY ./src/ /code/appfood/src/
CMD ["python","appfood/app.py"]

#--To build the app image, use the following commands--#
# cd the-real-devops-challenge
# docker build -t youego/app-food .
#--To build the mongoDB image, use the following commands--#
# docker build -t youego/mongo ./db-docker/
#--How to create a docker Network
# docker network create mynetwork
#--How to run DB container in the network "mynetwork"
# docker run -d --publish 37017:27017 --network mynetwork youego/mongo
#--How to run the app container in the network "mynetwork"
# docker run -d -p 8080:8080 -e MONGO_URI=mongodb://<DB_containerID>/food_db --network mynetwork youego/app-food
