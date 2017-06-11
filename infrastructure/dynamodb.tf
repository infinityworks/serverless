resource "aws_dynamodb_table" "submissions_table" {
  name = "${var.env}-submissions"

  # Set the read/write capacity to stay within the free tier
  read_capacity = 5
  write_capacity = 5
  
  hash_key = "id"

  attribute {
    name = "id"
    type = "S"
  }

  stream_enabled = true
  stream_view_type = "NEW_IMAGE"
}
