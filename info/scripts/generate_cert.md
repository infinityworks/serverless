# Generate Certificate Shell Script

[generate_cert](../../scripts/generate_cert)

Generates a TLS certificate to use for the local build. This script is run within a Docker container with OpenSSL. It can be run with the `make create-cert` command in the root folder.

Before you generate a new certificate, you will need a Root CA private key and certificate which you can create with the following commands:

Private key:

`openssl genrsa -aes256 -out ./infrastructure/local/pki/rootCA.pem 4096`

Certificate:

`openssl req -key rootCA.pem -new -x509 -days 7300 -sha256 -out ./infrastructure/local/pki/rootCA.cert`

You will then need to trust the rootCA certificate on your machine.

## TODO

* Get the right commands for this section
* Explain how to trust certs on Mac/Linux/Windows
