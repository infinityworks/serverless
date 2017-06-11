resource "aws_api_gateway_rest_api" "serverless_gateway" {
  name        = "${var.env}-${var.app_name}-api-gateway"
  description = "API for ${var.app_name}"
}

resource "aws_api_gateway_account" "serverless_gateway_account" {
  cloudwatch_role_arn = "${aws_iam_role.serverless_application_cloudwatch.arn}"
}

resource "aws_api_gateway_deployment" "serverless_application_deployment" {
  rest_api_id = "${aws_api_gateway_rest_api.serverless_gateway.id}"
  stage_name = "api"
}

# <processor>

resource "aws_api_gateway_resource" "serverless_gateway_submission_resource" {
  rest_api_id = "${aws_api_gateway_rest_api.serverless_gateway.id}"
  parent_id = "${aws_api_gateway_rest_api.serverless_gateway.root_resource_id}"
  path_part = "submission"
}

resource "aws_api_gateway_method" "serverless_gateway_submission_post_method" {
  rest_api_id = "${aws_api_gateway_rest_api.serverless_gateway.id}"
  resource_id = "${aws_api_gateway_resource.serverless_gateway_submission_resource.id}"
  http_method = "POST"
  authorization = "NONE"
}

resource "aws_api_gateway_method_response" "processor_200" {
  rest_api_id = "${aws_api_gateway_rest_api.serverless_gateway.id}"
  resource_id = "${aws_api_gateway_resource.serverless_gateway_submission_resource.id}"
  http_method = "${aws_api_gateway_method.serverless_gateway_submission_post_method.http_method}"
  status_code = "200"

  response_parameters = {
    "method.response.header.Access-Control-Allow-Headers" = true
    "method.response.header.Access-Control-Allow-Methods" = true
    "method.response.header.Access-Control-Allow-Origin" = true
  }
}

resource "aws_api_gateway_method_response" "processor_500" {
  rest_api_id = "${aws_api_gateway_rest_api.serverless_gateway.id}"
  resource_id = "${aws_api_gateway_resource.serverless_gateway_submission_resource.id}"
  http_method = "${aws_api_gateway_method.serverless_gateway_submission_post_method.http_method}"
  status_code = "500"

  response_parameters = {
    "method.response.header.Access-Control-Allow-Headers" = true
    "method.response.header.Access-Control-Allow-Methods" = true
    "method.response.header.Access-Control-Allow-Origin" = true
  }
}

resource "aws_api_gateway_method_response" "processor_403" {
  rest_api_id = "${aws_api_gateway_rest_api.serverless_gateway.id}"
  resource_id = "${aws_api_gateway_resource.serverless_gateway_submission_resource.id}"
  http_method = "${aws_api_gateway_method.serverless_gateway_submission_post_method.http_method}"
  status_code = "403"

  response_parameters = {
    "method.response.header.Access-Control-Allow-Headers" = true
    "method.response.header.Access-Control-Allow-Methods" = true
    "method.response.header.Access-Control-Allow-Origin" = true
  }
}

resource "aws_api_gateway_integration" "serverless_gateway_submission_post_integration" {
  rest_api_id = "${aws_api_gateway_rest_api.serverless_gateway.id}"
  resource_id = "${aws_api_gateway_resource.serverless_gateway_submission_resource.id}"
  http_method = "${aws_api_gateway_method.serverless_gateway_submission_post_method.http_method}"
  type = "AWS"

  uri = "arn:aws:apigateway:${var.region}:lambda:path/2015-03-31/functions/${aws_lambda_function.submission_processor.arn}/invocations"
  integration_http_method = "${aws_api_gateway_method.serverless_gateway_submission_post_method.http_method}"
}

resource "aws_api_gateway_integration_response" "serverless_gateway_submission_post_integration_response" {
  depends_on = [
    "aws_api_gateway_integration.serverless_gateway_submission_post_integration"
  ]

  rest_api_id = "${aws_api_gateway_rest_api.serverless_gateway.id}"
  resource_id = "${aws_api_gateway_resource.serverless_gateway_submission_resource.id}"
  http_method = "${aws_api_gateway_method.serverless_gateway_submission_post_method.http_method}"
  status_code = "${aws_api_gateway_method_response.processor_200.status_code}"
}

resource "aws_api_gateway_integration_response" "serverless_gateway_submission_post_error_integration_response" {
  depends_on = [
    "aws_api_gateway_integration.serverless_gateway_submission_post_integration"
  ]

  rest_api_id = "${aws_api_gateway_rest_api.serverless_gateway.id}"
  resource_id = "${aws_api_gateway_resource.serverless_gateway_submission_resource.id}"
  http_method = "${aws_api_gateway_method.serverless_gateway_submission_post_method.http_method}"
  status_code = "${aws_api_gateway_method_response.processor_500.status_code}"
  selection_pattern = ".*[ERROR].*"
}

resource "aws_api_gateway_integration_response" "serverless_gateway_submission_post_forbidden_integration_response" {
  depends_on = [
    "aws_api_gateway_integration.serverless_gateway_submission_post_integration"
  ]

  rest_api_id = "${aws_api_gateway_rest_api.serverless_gateway.id}"
  resource_id = "${aws_api_gateway_resource.serverless_gateway_submission_resource.id}"
  http_method = "${aws_api_gateway_method.serverless_gateway_submission_post_method.http_method}"
  status_code = "${aws_api_gateway_method_response.processor_403.status_code}"
  selection_pattern = ".*[FORBIDDEN].*"
}

# </processor>
