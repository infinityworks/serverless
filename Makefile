create-cert:
	docker run --rm -v `pwd`/infrastructure/local/pki/:/etc/ssl/private/ -v `pwd`/scripts/generate_cert:/generate.sh node:latest /bin/sh -c "/bin/sh generate.sh serverless.iwc.dev"
