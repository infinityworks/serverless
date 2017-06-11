# <processor>
resource "aws_lambda_function" "submission_processor" {
  s3_bucket = "${aws_s3_bucket.serverless_lambda_bucket.id}"
  s3_key = "processor.zip"

  function_name = "${var.env}_submission_processor"
  role = "${aws_iam_role.serverless_lambda_role.arn}"
  handler = "index.handler"
  timeout = 300

  runtime = "nodejs4.3"
}

resource "aws_lambda_permission" "allow_processor_gateway" {
  statement_id = "processor_allow_execution_from_gateway"

  action = "lambda:InvokeFunction"
  function_name = "${aws_lambda_function.submission_processor.function_name}"

  principal = "apigateway.amazonaws.com"

  # Can we simplify this a bit?
  source_arn = "arn:aws:execute-api:${var.region}::${aws_api_gateway_rest_api.serverless_gateway.id}/*/${aws_api_gateway_integration.serverless_gateway_submission_post_integration.integration_http_method}${aws_api_gateway_resource.serverless_gateway_submission_resource.path}"
}

resource "aws_lambda_permission" "processor_release_bucket_permission" {
  statement_id = "${var.env}_processor_release_bucket_permission"

  action = "lambda:InvokeFunction"
  function_name = "${aws_lambda_function.submission_processor.arn}"

  principal = "s3.amazonaws.com"
  source_arn = "${aws_s3_bucket.serverless_lambda_bucket.arn}"
}
# </processor>
