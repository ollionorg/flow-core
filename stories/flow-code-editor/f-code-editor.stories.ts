import { html } from "lit-html";

export default {
	title: "@ollion/flow-code-editor/f-code-editor",

	parameters: {
		controls: {
			hideNoControlsWarning: true
		}
	}
};

const code = `# Variables
variable "instance_type" {
  description = "The type of EC2 instance to launch"
    default = "t2.micro"
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
`.trim();

export const Playground = {
	// updateArgs({ code: ev.detail.value });
	render: (args: Record<string, any>) => {
		const handleInput = function (ev: Event) {
			//console.log(ev);
		};

		return html`<f-div padding="x-large" height="100%">
			<f-code-editor
				.code=${args.code}
				.language=${args.language}
				.state=${args.state}
				.comments=${args.comments}
				?copy-button=${args["copy-button"]}
				.title=${args.title}
				?show-line-numbers=${args["show-line-numbers"]}
				?read-only=${args["read-only"]}
				@content-change=${handleInput}
			></f-code-editor>
		</f-div>`;
	},

	name: "Playground",

	argTypes: {
		code: {
			control: "text"
		},

		title: {
			control: "text"
		},

		comments: {
			control: "boolean"
		},

		["copy-button"]: {
			control: "boolean"
		},

		state: {
			control: "select",
			options: ["default", "secondary", "subtle"]
		},

		["show-line-numbers"]: {
			control: "boolean"
		},

		language: {
			control: "select",

			options: [
				"scala",
				"python",
				"json",
				"css",
				"scss",
				"less",
				"html",
				"yaml",
				"javascript",
				"typescript"
			]
		},

		["read-only"]: {
			control: "boolean"
		}
	},

	args: {
		code: code,

		title: "",
		comments: false,
		["copy-button"]: false,
		["show-line-numbers"]: false,
		state: "default",
		language: "hcl",
		["read-only"]: false
	}
};

export const Code = {
	render: (args: Record<string, any>) => {
		return html`
			<f-div padding="x-large" height="100%">
				<f-code-editor .code=${args.code} .language=${args.language}></f-code-editor>
			</f-div>
		`;
	},

	name: "code",

	argTypes: {
		code: {
			control: false
		},

		language: {
			control: false
		}
	},

	args: {
		code: `object ScalaExample{
    def main(args:Array[String]){
        println "Hello Scala"
    }
}  `,

		language: "scala"
	}
};

export const Title = {
	render: (args: Record<string, any>) => {
		const value = "";

		const handleInput = (e: CustomEvent) => {
			console.log("event.detail.value", e.detail.value);
		};

		return html`
			<f-div padding="x-large" height="100%" gap="x-large" direction="column">
				<f-div width="200px" height="hug-content">
					<f-input
						.value=${value}
						@input=${handleInput}
						placeholder="Enter your title here"
					></f-input>
				</f-div>
				<f-text
					>Now, on the basis of title header gets shown on code-editor, "title='This is a
					title'"</f-text
				>
				<f-div overflow="hidden">
					<f-code-editor
						.code=${args.code}
						.language=${args.language}
						.title=${value}
					></f-code-editor>
				</f-div>
			</f-div>
		`;
	},

	name: "title",

	argTypes: {
		code: {
			control: false
		},

		language: {
			control: false
		}
	},

	args: {
		code: `object ScalaExample{
    def main(args:Array[String]){
        println "Hello Scala"
    }
}  `,

		language: "scala"
	}
};

export const Comments = {
	render: (args: Record<string, any>) => {
		const value = true;

		const handleInput = (e: CustomEvent) => {
			console.log("e.detail.value", e.detail.value);
		};

		return html`
			<f-div padding="x-large" height="100%" gap="x-large" direction="column">
				<f-div height="hug-content">
					<f-switch .value=${value} @input=${handleInput}>
						<f-text slot="label">Add Comments Toggle button to header</f-text>
					</f-switch>
				</f-div>
				<f-text
					>Now, on the basis of comments, header gets shown on code-editor, "comments=true"</f-text
				>
				<f-div overflow="hidden">
					<f-code-editor
						.code=${args.code}
						.language=${args.language}
						title="JAVASCRIPT"
						?comments=${value}
					></f-code-editor>
				</f-div>
			</f-div>
		`;
	},

	name: "comments",

	argTypes: {
		code: {
			control: false
		},

		language: {
			control: false
		}
	},

	args: {
		code: `/**
 * dce
 * ewcer
 */
function add(a, b) {
  // This function adds two numbers
  return a + b; // Return the sum
}`,

		language: "javascript"
	}
};

export const CopyButton = {
	render: (args: Record<string, any>) => {
		const value = true;

		const handleInput = (e: CustomEvent) => {
			console.log("e.detail.value", e.detail.value);
		};

		return html`
			<f-div padding="x-large" height="100%" gap="x-large" direction="column">
				<f-div height="hug-content">
					<f-switch .value=${value} @input=${handleInput}>
						<f-text slot="label">Add Copy button button to header</f-text>
					</f-switch>
				</f-div>
				<f-text
					>Now, on the basis of copy-button, header gets shown on code-editor,
					"copy-button=true"</f-text
				>
				<f-div overflow="hidden">
					<f-code-editor
						.code=${args.code}
						.language=${args.language}
						title="JAVASCRIPT"
						?copy-button=${value}
					></f-code-editor>
				</f-div>
			</f-div>
		`;
	},

	name: "copy-button",

	argTypes: {
		code: {
			control: false
		},

		language: {
			control: false
		}
	},

	args: {
		code: `/**
 * dce
 * ewcer
 */
function add(a, b) {
  // This function adds two numbers
  return a + b; // Return the sum
}`,

		language: "javascript"
	}
};

export const ShowLineNumbers = {
	render: (args: Record<string, any>) => {
		const value = true;

		const handleInput = (e: CustomEvent) => {
			console.log("e.detail.value", e.detail.value);
		};

		return html`
			<f-div padding="x-large" height="100%" gap="x-large" direction="column">
				<f-div height="hug-content">
					<f-switch .value=${value} @input=${handleInput}>
						<f-text slot="label">Toggle Line No.'s</f-text>
					</f-switch>
				</f-div>
				<f-text>show-line-numbers=${value}</f-text>
				<f-div overflow="hidden">
					<f-code-editor
						.code=${args.code}
						.language=${args.language}
						title="JAVASCRIPT"
						?show-line-numbers=${value}
					></f-code-editor>
				</f-div>
			</f-div>
		`;
	},

	name: "show-line-numbers",

	argTypes: {
		code: {
			control: false
		},

		language: {
			control: false
		}
	},

	args: {
		code: `/**
 * dce
 * ewcer
 */
function add(a, b) {
  // This function adds two numbers
  return a + b; // Return the sum
}`,

		language: "javascript"
	}
};

export const State = {
	render: (args: Record<string, any>) => {
		const value = "default";
		const options = ["default", "secondary", "subtle"];

		const handleInput = (e: CustomEvent) => {
			console.log("e.detail.value", e.detail.value);
		};

		return html`
			<f-div padding="x-large" height="100%" gap="x-large" direction="column">
				<f-div width="200px" height="hug-content">
					<f-select .value=${value} @input=${handleInput} .options=${options}></f-select>
				</f-div>
				<f-text> "state=${value}"</f-text>
				<f-div overflow="hidden">
					<f-code-editor
						.code=${args.code}
						.language=${args.language}
						title="JAVASCRIPT"
						.state=${value}
					></f-code-editor>
				</f-div>
			</f-div>
		`;
	},

	name: "state",

	argTypes: {
		code: {
			control: false
		},

		language: {
			control: false
		}
	},

	args: {
		code: `/**
 * dce
 * ewcer
 */
function add(a, b) {
  // This function adds two numbers
  return a + b; // Return the sum
}`,

		language: "javascript"
	}
};

export const Language = {
	render: (args: Record<string, any>) => {
		return html`
			<f-div padding="x-large" height="100%">
				<f-code-editor .code=${args.code} .language=${args.language}></f-code-editor>
			</f-div>
		`;
	},

	name: "language",

	argTypes: {
		code: {
			control: false
		},

		language: {
			control: false
		}
	},

	args: {
		code: `object ScalaExample{
    def main(args:Array[String]){
        println "Hello Scala"
    }
}  `,

		language: "scala"
	}
};

export const ReadOnly = {
	render: (args: Record<string, any>) => {
		const value = false;

		const handleInput = (e: CustomEvent) => {
			console.log("e.detail.value", e.detail.value);
		};

		return html`
			<f-div padding="x-large" height="100%" gap="x-large" direction="column">
				<f-div height="hug-content">
					<f-switch .value=${value} @input=${handleInput}>
						<f-text slot="label">Toggle read-only mode</f-text>
					</f-switch>
				</f-div>
				<f-text>read-only=${value}</f-text>
				<f-div overflow="hidden">
					<f-code-editor
						.code=${args.code}
						.language=${args.language}
						title="JAVASCRIPT"
						?read-only=${value}
						state="subtle"
						?copy-button=${true}
						?comments=${true}
					></f-code-editor>
				</f-div>
			</f-div>
		`;
	},

	name: "read-only",

	argTypes: {
		code: {
			control: false
		},

		language: {
			control: false
		}
	},

	args: {
		code: `/**
 * dce
 * ewcer
 */
function add(a, b) {
  // This function adds two numbers
  return a + b; // Return the sum
}`,

		language: "javascript"
	}
};
