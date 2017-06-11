resource "aws_cloudfront_distribution" "serverless_cloudfront" {
  depends_on = [
      "aws_s3_bucket.serverless_site_bucket"
  ]

  comment = "${var.env} - ${var.app_name}"

  origin = [
    {
      domain_name = "${aws_s3_bucket.serverless_site_bucket.website_endpoint}"
      origin_id   = "SiteBucket"

      custom_origin_config = {
        http_port              = "80"
        https_port             = "443"
        origin_protocol_policy = "http-only"
        origin_ssl_protocols   = ["TLSv1.1", "TLSv1.2"]
      }
    },
    {
      domain_name = "${aws_api_gateway_rest_api.serverless_gateway.id}.execute-api.${var.region}.amazonaws.com"
      origin_id = "ApiGateway"

      custom_origin_config = {
        http_port              = "80"
        https_port             = "443"
        origin_protocol_policy = "https-only"
        origin_ssl_protocols   = ["TLSv1.1", "TLSv1.2"]
      }
    },
  ]

  enabled             = true
  default_root_object = "index.html"

  price_class = "PriceClass_100"
  aliases     = ["${var.cloudfront_alias}"]

  default_cache_behavior = {
    allowed_methods  = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "SiteBucket"

    forwarded_values = {
      query_string = false

      cookies = {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
  }

  cache_behavior = [
    {
      allowed_methods  = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
      cached_methods   = ["GET", "HEAD"]
      target_origin_id = "ApiGateway"

      forwarded_values = {
        query_string = false
        headers      = []

        cookies = {
          forward = "none"
        }
      }

      path_pattern           = "/api/submission/*"
      viewer_protocol_policy = "allow-all"
      min_ttl                = 0
      default_ttl            = 0
      max_ttl                = 0
    }
  ]

  restrictions = {
    geo_restriction = {
      restriction_type = "whitelist"
      locations        = ["GB"]
    }
  }

  viewer_certificate = {
    cloudfront_default_certificate = true

    # Setup AWS Certificate Manager to use your own TLS certificate.
    # acm_certificate_arn      = "${var.acm_certificate_arn}"
    # minimum_protocol_version = "TLSv1"
    # ssl_support_method       = "sni-only"
  }

  tags {
    Environment = "${var.env}"
  }
}
