# Generate Certificate Shell Script

[generate_cert](../../scripts/generate_cert)

Generates a TLS certificate to use for the local build. This script is run within a Docker container with OpenSSL. It can be run with the `make create-cert` command in the root folder.

Before you generate a new certificate, you will need a Root CA private key and certificate which you can create by following the instructions on this link:

[Create the Root Pair](https://jamielinux.com/docs/openssl-certificate-authority/create-the-root-pair.html)

_NOTE:_ On our root CA key, we've set the passphrase to `serverless`

## TODO

* Explain how to trust certs on Mac/Linux/Windows
