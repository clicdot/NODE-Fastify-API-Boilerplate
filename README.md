# C360-MicroService--NODE--Boilerplate

This boilerplate was designed to be utilized as a microservice starter kit for NodeJS. There will be a docker-compose.

To get started, just type the following command in the root directory.

```javascript
$ npm install
```

```javascript
$ npm start
```

This application was written for use in a Docker container with Docker Compose.

## dB Connectors

A plugin has been created to allow easy connection to MySQL, MongoDB, Redis

```text
./plugins/dbconnect.js
```

#### MongoDB

> Line 10: uncomment this line.

> Set the MongoDB Connector URL in the .env file under _MONGODB_URL_.

#### MySQL

> Line 13: uncomment this line.

> Set The DB Parameters in the .env file

```text
DB_CONNECTION=mysql
DB_HOST=localhost
DB_PORT=3306
DB_DATABASE=local_db
DB_USERNAME=root
DB_PASSWORD=root
```

#### Redis

> Line 19: uncomment this line.

> Set the Redis Host in the .env file under _REDIS_HOST_.

#### ElasticSearch

> Line 16: uncomment this line.

> Set the ElasticSearch Host & Port in the .env file under _ELAST_HOST_/_ELAST_PORT_.

## Development

Development instance of app uses _nodemon_ so the code can dynamically update when code changes are detected. [NodeMon Getting Started](https://github.com/remy/nodemon).

Git commits are limited by linting the code and running successful unit tests through a pre-commit hook. Please do not override this as it is not fair to others developers that have to discover and fix linting and code errors that do not belong to them.

```javascript
$ npm start
```

Server on http://localhost:3200/v1/api

### Linting

```javascript
$ npm run lint
```

### Unit Tests

Unit test runner is TAP ([Test Anything Protocol](http://testanything.org/)).

- [Getting started with TAP](https://www.node-tap.org/basics/)
- [TAP Website](https://www.node-tap.org/)

```javascript
$ npm test
```

#### Code Coverage

```javascript
$ npm run test:coverage
```

### Load Test with Artillery

I've packaged a simple load test to demonstrate the scalabilty of nodeJS and Fastify.

The default load test run for 1 minute ata request of 100 requests per sec. The configuration file can be found in ./test-load/root.v1.yml and looks like this:

```javascript
config:
  target: 'http://localhost:3200'
  phases:
    - duration: 60
      arrivalRate: 100
  defaults:
    headers:
scenarios:
  - flow:
    - get:
        url: "/v1/api"

```

By adjusting the _arrivalRate_ you can change the concurrent request per second. By adjusting the duration, you can stress test for a long period.

Be warned, if you are running this locally on your laptop, the load test does take  up a lot of CPU resources.

I've turned it up to 20,000 concurrent calls per second and my laptop start to crawl but I do not get any 502 or 504 errors. It runs slower but it never fails. It takes a long time to finish but it will finish and with all 200 success codes (1.2 million calls).

Unlike PHP which starts to fail around 300-400 concurrent calls per second. It thresholds up a bit to 600ish but at a failure rate of 30%-50%, throwing 502/504 errors. Nginx doesn't fail, it just stops connecting after a while because PHP times out or is unresponsive.

```javascript
$ npm run test:load
```

### Swagger

This app will auto-generate a swagger interactive documentation based on the endpoints in the project. Its pre-configured so no need to do anything, just build the endpoints using the folder & code organization.

Swagger Document on http://localhost:3200/swagger

This app also can configure, endpoints and scaffold your endpoint project using _'fastify-swaggergen'_. [Getting Started](https://github.com/fastify/fastify-swagger)

## UAT/Stage/Production Deployment

This app uses pm2 process controller. Scripts have been created for Dev, UAT, M360, and production.

The _process.json_ file holds the configuration for each ENV. Edit and configure the _process.json_ file to meet your needs.

You can start the pm2 process by

```javascript
$ npm run build:dev
```

```javascript
$ npm run build:uat
```

```javascript
$ npm run build:m360
```

```javascript
$ npm run build:prod
```

[PM2 Getting Started](https://github.com/Unitech/pm2)

## API Uniform Response

Each API response will have a uniform response data structure. The primary structures are

- response
- data

with sub entries as follows

```json
{
  "response": {
    "code": 200,
    "id": "46489477-4eca-4a17-8f31-2197764517b4",
    "timestamp": "2019-05-29T06:53:14.125Z",
    "function": {
      "method": "GET",
      "url": "/api/v1/",
      "ip": "127.0.0.1",
      "apiVersion": "v1"
    },
    "messages": []
  },
  "data": {
    "test": "Help - V1 - get"
  }
}
```


# TODO

- Documentation on Routing and Controllers
- Documentation on ENV usage
- Documentation on Plugin (how to & usage)
- Create Uniform Response Schema

```json
{
  "response": {
    "code": 200,
    "id": "4ccfe905-0c7d-48ab-a7b1-e2815b684da0",
    "timestamp": "2019-0505T08:08:08Z",
    "function": {},
    "messages": {
      "errors": [],
      "warnings": [],
      "info": []
    }
  },
  "data": []
}
```

- OAuth2.0 integration that supports Client Credentials
- Finish parameterizing variables that can be set in ENV or globally
- Implement _fastify-swaggergen_ for faster scaffolding code
- Add docker & docker composer for microservices
- Parameterize Docker settings like Port, service name, network through ENV file
- Finish Lambda service wrapper
- Linting rules