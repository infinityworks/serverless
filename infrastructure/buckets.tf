resource "aws_s3_bucket" "serverless_site_bucket" {
  bucket = "${var.env}-${var.app_name}-site-bucket"
  acl = "public-read"

  website {
    index_document = "index.html"
    error_document = "index.html"
  }

  versioning {
    enabled = true
  }

  tags {
    Name = "${var.env}-${var.app_name}-site-bucket"
    Environment = "${var.env}"
  }
}

resource "aws_s3_bucket" "serverless_lambda_bucket" {
  bucket = "${var.env}-${var.app_name}-lambda-bucket"
  acl = "private"

  versioning {
    enabled = true
  }

  tags {
    Name = "${var.env}-${var.app_name}-lambda-bucket"
    Environment = "${var.env}"
  }
}

# We need to initialise with a placeholder function so that the Lambda function
# will be created from the code in the S3 bucket.
resource "aws_s3_bucket_object" "placeholder_processor_file" {
  depends_on = [
    "aws_s3_bucket.serverless_lambda_bucket"
  ]

  bucket = "${var.env}-${var.app_name}-lambda-bucket"
  key = "processor.zip"
  source = "placeholder/processor.zip"
  etag = "${md5(file("placeholder/processor.zip"))}"
}
