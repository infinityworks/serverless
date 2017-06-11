variable "acm_certificate_arn" {}
variable "cloudfront_alias" {}
variable "account_id" {}

variable "env" {
  default = "dev"
}

variable "region" {
  default = "eu-west-2"
}

variable "app_name" {
  default = "serverless"
}
