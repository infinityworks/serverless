docker-start:
	docker run -d -p 127.0.0.1:8000:8000 --rm -v `pwd`/:/src openjdk /bin/sh -c "cd /src/; java -Djava.library.path=./assets/DynamoDBLocal_lib -jar ./assets/DynamoDBLocal.jar -sharedDb"

start:
	java -Djava.library.path=./assets/DynamoDBLocal_lib -jar ./assets/DynamoDBLocal.jar -sharedDb