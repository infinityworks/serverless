terraform {
  backend "s3" {
    bucket = "${var.app_name}-terraform-state"
    key = "${var.app_name}.tfstate"
    region = "eu-west-2"
    shared_credentials_file = "/infrastructure/aws.credentials"
  }
}

provider "aws" {
  shared_credentials_file = "/infrastructure/aws.credentials"
  profile = "default"
  region = "${var.region}"
}
