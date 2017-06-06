# =======================================================
# Local Targets
# =======================================================

create-cert:
	docker run --rm -v `pwd`/infrastructure/local/pki/:/etc/ssl/private/ -v `pwd`/scripts/generate_cert:/generate.sh node:latest /bin/sh -c "/bin/sh generate.sh serverless.iwc.dev"

init: init-client init-lambdas

build: build-client

test: test-client

lint: lint-client



# =======================================================
# Continuous Integration Targets
# =======================================================

env ?= dev

ci-build:
	docker run --rm --workdir=/client -v `pwd`/src/client:/client node:latest /bin/sh -c "npm run build-prod"

ci-publish-lambdas:


# =======================================================
# Client Targets
# =======================================================



init-client:
	docker run --rm --workdir=/client -v `pwd`/src/client:/client node:latest /bin/sh -c "npm install"

build-client:
	docker run --rm --workdir=/client -v `pwd`/src/client:/client node:latest /bin/sh -c "npm run build-dev"

test-client:
	docker run --rm --workdir=/client -v `pwd`/src/client:/client node:latest /bin/sh -c "npm test"

lint-client:
	docker run --rm --workdir=/client -v `pwd`/src/client:/client node:latest /bin/sh -c "npm run lint"



# =======================================================
# Lambda Targets
# =======================================================

init-lambdas:
	docker run --rm --workdir=/lambdas -v `pwd`/src/lambdas:/lambdas node:latest /bin/sh -c "npm install"
