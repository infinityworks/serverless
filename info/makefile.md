# The Makefile

The makefile is used to run scripts and commands from a single source of truth without having to get your head in a twist over what goes where. Most of the files in the `scripts` folder will be run from here in an ephemeral Docker container.

## Local Targets

### `make create-cert`
Generates the TLS certificates to be used for the local API mock

More information on the script can be found [here](scripts/generate_cert.md)

### `make init`

Initialises the application(s) by installing all required node modules.

### `make build`

Builds all applications into a distribution bundle to be run on the local machine.

## Continuous Integration Targets

### `ci-build`

Builds the applications into a minified distributable bundle ready for production use.

* Static web files in the case of the client
* A standalone .zip file in the case of the lambdas

### `ci-publish-lambdas <env=dev>`

Publishes the Lambda functions by uploading them to an S3 bucket and then updating the Lambda function running on AWS.

## Client Targets

### `make init-client`

Initialises the client application. This is the React and Redux application that needs Webpack and node-sass to build.

### `make build-client`

Bundles the client application into a distributable set of JavaScript, CSS and HTML files to be served as a web application.

## Lambda Targets

### `make init-lambdas`

Initialises the lambdas. The lambdas require their own dependencies for server-side application code (such as the AWS SDK).
