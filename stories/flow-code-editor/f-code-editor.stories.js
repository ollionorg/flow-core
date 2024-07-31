import { html } from "lit-html";
import { useArgs, useState } from "@storybook/client-api";

export default {
	title: "@nonfx/flow-code-editor/f-code-editor",

	parameters: {
		controls: {
			hideNoControlsWarning: true
		}
	}
};

export const Playground = {
	// updateArgs({ code: ev.detail.value });
	render: args => {
		const [_, updateArgs] = useArgs();

		const handleInput = function (ev) {
			console.log(ev);
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
		code: `%TAG ! tag:clarkevans.com,2002:
--- !shape
  # Use the ! handle for presenting
  # tag:clarkevans.com,2002:circle
- !circle
  center: &ORIGIN {x: 73, y: 129}
  radius: 7
- !line
  start: *ORIGIN
  finish: { x: 89, y: 102 }
- !label
  start: *ORIGIN
  color: 0xFFEEBB
  text: Pretty vector drawing.`,

		title: "",
		comments: false,
		["copy-button"]: false,
		["show-line-numbers"]: false,
		state: "default",
		language: "scala",
		["read-only"]: false
	}
};

export const Code = {
	render: args => {
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
	render: args => {
		const [value, setValue] = useState("");

		const handleInput = e => {
			setValue(e.detail.value);
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
	render: args => {
		const [value, setValue] = useState(true);

		const handleInput = e => {
			setValue(e.detail.value);
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
	render: args => {
		const [value, setValue] = useState(true);

		const handleInput = e => {
			setValue(e.detail.value);
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
	render: args => {
		const [value, setValue] = useState(true);

		const handleInput = e => {
			setValue(e.detail.value);
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
	render: args => {
		const [value, setValue] = useState("default");
		const options = ["default", "secondary", "subtle"];

		const handleInput = e => {
			setValue(e.detail.value);
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
	render: args => {
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
	render: args => {
		const [value, setValue] = useState(false);

		const handleInput = e => {
			setValue(e.detail.value);
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
