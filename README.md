# led-object-service

This service handles the led objects in a scene. It stores all the objects and exposes an API to update and query for configuration.

## Usage
Install dependencies: `yarn`.
Create `.env` file with relevant configuration, then `yarn start:dev` for development server, or `yarn start:prod` to run compiled js code.

## REST API
LED objects can be modified and queried via REST API.
To set the port for the http server, use environment variable:
```
SERVER_PORT=8081
```

### Endpoints:
- PUT `led-object/:thingName` - upsert configuration for an object. Payload should be `application/json` in the following format:
```json
{
	"numberOfPixels": 13,
	"segments": [{
		"name": "left",
		"indices": [1, 2, 3, 5]
	}, {
		"name": "right",
		"indices": [4, 2, 6, 7, 8]
	}]
}
```

- GET `led-object/:thingName` - get object configuration for `thingName`. You can set `Content-Type` to either `application/json` or `application/x-protobuf`. 

## MQTT broker
The service connects to an mqtt broker which is used to update controllers on a change in configuration.
Set mqtt broker via environment variable:
```
BROKER_URL=mqtt://192.168.1.26
```

## Storage
The storage for objects can be configured via environment variables. Currently only git storge is supported.

### Git Storage
Git storage uses a local directory to store JSON files with the objects and configuration. It is the user's responsibility to create this directory, init it as the git repo, and sync it to remote origin.

To use git storage, set the following env variables:
```
STORAGE_TYPE=git
GIT_STORAGE_REPO=/path/to/git/directory
```
