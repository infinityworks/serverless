terraform {
  backend "s3" {
    bucket = "serverless-terraform-state"
    key = "serverless.tfstate"
    region = "eu-west-2"
    shared_credentials_file = "/infrastructure/aws.credentials"
  }
}

provider "aws" {
  shared_credentials_file = "/infrastructure/aws.credentials"
  profile = "default"
  region = "${var.region}"
}
