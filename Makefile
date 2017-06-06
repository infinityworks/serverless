# =======================================================
# Variables
# =======================================================

TERRAFORM_CONTAINER=hashicorp/terraform:0.9.2
NODE_CONTAINER=node:latest
region ?= eu-west-2
env ?= dev



# =======================================================
# Local Targets
# =======================================================

create-cert:
	docker run --rm -it\
	 -v `pwd`/infrastructure/local/pki/:/etc/ssl/private/\
	 -v `pwd`/scripts/generate_cert:/generate\
	 $(NODE_CONTAINER)\
	 /bin/sh -c "/bin/sh generate serverless.iwc.dev"

init: init-client init-lambdas

build: build-client

test: test-client

lint: lint-client



# =======================================================
# Infrastructure Targets
# =======================================================

terraform-init:
	docker run -it\
	 --entrypoint "/bin/sh"\
	 -v `pwd`/infrastructure:/infrastructure\
	 -v `pwd`/scripts/terraform_init:/scripts/terraform_init\
	 -w /infrastructure\
	 -e "ENV=$(env)"\
	 $(TERRAFORM_CONTAINER)\
	 /scripts/terraform_init

terraform-validate:
	docker run --rm\
	 --entrypoint "/bin/sh"\
	 -v `pwd`/infrastructure:/infrastructure\
	 -v `pwd`/scripts/terraform_validate:/scripts/terraform_validate\
	 -w /infrastructure\
	 -e "ENV=$(env)"\
	 $(TERRAFORM_CONTAINER)\
	 /scripts/terraform_validate

terraform-plan:
	docker run --rm\
	 --entrypoint "/bin/sh"\
	 -v `pwd`/infrastructure:/infrastructure\
	 -v `pwd`/scripts/terraform_plan:/scripts/terraform_plan\
	 -w /infrastructure\
	 -e "ENV=$(env)"\
	 $(TERRAFORM_CONTAINER)\
	 /scripts/terraform_plan

terraform-apply:
	docker run --rm\
	 --entrypoint "/bin/sh"\
	 -v `pwd`/infrastructure:/infrastructure\
	 -v `pwd`/scripts/terraform_apply:/scripts/terraform_apply\
	 -w /infrastructure\
	 -e "ENV=$(env)"\
	 $(TERRAFORM_CONTAINER)\
	 /scripts/terraform_apply

terraform-destroy:
	docker run -it\
	 --entrypoint "/bin/sh"\
	 -v `pwd`/infrastructure:/infrastructure\
	 -v `pwd`/scripts/terraform_destroy:/scripts/terraform_destroy\
	 -w /infrastructure\
	 -e "ENV=$(env)"\
	 $(TERRAFORM_CONTAINER)\
	 /scripts/terraform_destroy

# =======================================================
# Continuous Integration Targets
# =======================================================

ci-build:
	docker run --rm\
	 -w /client\
	 -v `pwd`/src/client:/client\
	 $(NODE_CONTAINER)\
	 /bin/sh -c "npm run build-prod"

ci-publish-lambdas:
	docker run --rm\
	 --entrypoint "/bin/sh"
	 -w /scripts\
	 -v `pwd`/scripts:/scripts\
	 -v `pwd`/src/lambdas:/lambdas\
	 -e "ENV=$(env)"\
	 -e "REGION=$(region)"\
	 $(NODE_CONTAINER)\
	 /scripts/publish_lambdas


# =======================================================
# Client Targets
# =======================================================

init-client:
	docker run --rm\
	 -w /client\
	 -v `pwd`/src/client:/client\
	 $(NODE_CONTAINER)\
	 /bin/sh -c "npm install"

build-client:
	docker run --rm\
	 -w /client\
	 -v `pwd`/src/client:/client\
	 $(NODE_CONTAINER)\
	 /bin/sh -c "npm run build-dev"

test-client:
	docker run --rm\
	 -w /client\
	 -v `pwd`/src/client:/client\
	 $(NODE_CONTAINER)\
	 /bin/sh -c "npm test"

lint-client:
	docker run --rm\
	 -w /client\
	 -v `pwd`/src/client:/client\
	 $(NODE_CONTAINER)\
	 /bin/sh -c "npm run lint"



# =======================================================
# Lambda Targets
# =======================================================

init-lambdas:
	docker run --rm\
	 -w /lambdas\
	 -v `pwd`/src/lambdas:/lambdas\
	 $(NODE_CONTAINER)\
	 /bin/sh -c "npm install"
