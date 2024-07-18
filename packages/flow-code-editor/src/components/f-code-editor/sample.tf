# Variables
variable "instance_type" {
  description   = "The type of EC2 instance to launch"
  default       = "t2.micro"
  validation {
    condition     = var.web_instance_count > 1
    error_message = "This application requires at least two web instances."
  }
}

# Providers
provider "aws" {
  region = "us-west-2"
}

# Resources
resource "aws_instance" "example" {
  
  ami           = "ami-abc123"
  instance_type = var.instance_type
  tags = {
    Name = "ExampleInstance"
  }
}

resource "aws_s3_bucket" "example_bucket" {
  
  bucket = "example-bucket-name"
  acl    = "private"
  tags = {
    Name        = "ExampleBucket"
    Environment = "Production"
  }
}

# Data Sources
data "aws_ami" "example_ami" {
  
  most_recent = true
  owners      = ["self"]
  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-focal-20.04-amd64-server-*"]
  }
}

# Outputs
output "instance_public_ip" {
  value = aws_instance.example.public_ip
}

output "bucket_name" {
  value = aws_s3_bucket.example_bucket.bucket
}

# Locals
locals {
  example_local = "This is a local value"
}

# Modules (Example usage, module content not defined here)
module "example_module" {
  source = "./modules/example"
  var1   = "value1"
  var2   = "value2"
}

