import { FIconPickerCategories } from "@ollion/flow-core";
import { html } from "lit-html";

export default {
	title: "@ollion/flow-core/f-icon-picker",

	parameters: {
		controls: {
			hideNoControlsWarning: true
		}
	}
};

export const Playground = {
	render: (args: Record<string, unknown>) => {
		const handleInput = (e: CustomEvent) => {
			console.log("input event", e);
		};

		const categories: FIconPickerCategories = [
			{
				name: "System",
				categoryIcon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M15.5746 5.28064C15.6163 5.28211 15.6577 5.2724 15.6946 5.25246C15.7316 5.23253 15.7629 5.20306 15.7855 5.16693C15.8048 5.13047 15.8149 5.08959 15.8149 5.04805C15.8149 5.00651 15.8048 4.96563 15.7855 4.92917C15.0891 2.94562 13.8076 1.23595 12.1205 0.0395486C12.0816 0.0137303 12.0363 0 11.99 0C11.9437 0 11.8983 0.0137303 11.8594 0.0395486C10.1611 1.23117 8.86868 2.94136 8.16433 4.92917C8.145 4.96563 8.13487 5.00651 8.13487 5.04805C8.13487 5.08959 8.145 5.13047 8.16433 5.16693C8.18691 5.20306 8.21821 5.23253 8.25518 5.25246C8.29214 5.2724 8.33349 5.28211 8.3752 5.28064H15.5746Z" fill="white"/>
			<path d="M18.4764 10.9663C18.4813 11.0321 18.5097 11.0939 18.556 11.1396C18.6023 11.1854 18.6633 11.212 18.7275 11.2144H23.748C23.8197 11.2138 23.8883 11.1841 23.9388 11.1317C23.9608 11.1046 23.9775 11.0733 23.9879 11.0396C23.9982 11.0059 24.002 10.9704 23.999 10.9352C23.8842 9.56653 23.5447 8.22778 22.9949 6.97599C22.9738 6.93169 22.9409 6.89453 22.9 6.86888C22.8591 6.84324 22.8119 6.83019 22.764 6.83126H18.2857C18.2492 6.83158 18.2133 6.84007 18.1803 6.85613C18.1474 6.8722 18.1182 6.89546 18.0949 6.9243C18.0782 6.95789 18.0694 6.9951 18.0694 7.03285C18.0694 7.07059 18.0782 7.1078 18.0949 7.14139C18.3261 8.40307 18.4537 9.68254 18.4764 10.9663Z" fill="white"/>
			<path d="M16.7293 11.2247C16.7975 11.2215 16.8621 11.192 16.9101 11.142C16.9384 11.1222 16.9621 11.0962 16.9795 11.0658C16.9968 11.0354 17.0074 11.0014 17.0105 10.9663C16.9647 9.64339 16.7966 8.32803 16.5084 7.03801C16.4939 6.97222 16.456 6.91443 16.402 6.87613C16.3481 6.83783 16.2821 6.82181 16.2172 6.83126H7.76269C7.70578 6.83135 7.65045 6.85059 7.60513 6.88605C7.55981 6.92151 7.52699 6.97124 7.51167 7.02768C7.2093 8.31972 7.02774 9.63859 6.96945 10.9663C6.96606 10.9999 6.96968 11.0339 6.98007 11.066C6.99046 11.0981 7.00738 11.1275 7.0297 11.1523C7.07768 11.2023 7.14223 11.2319 7.21044 11.235L16.7293 11.2247Z" fill="white"/>
			<path d="M8.40532 18.7194C8.36362 18.7179 8.32226 18.7276 8.2853 18.7475C8.24834 18.7675 8.21703 18.7969 8.19446 18.8331C8.17512 18.8695 8.16499 18.9104 8.16499 18.9519C8.16499 18.9935 8.17512 19.0344 8.19446 19.0708C8.8988 21.0586 10.1912 22.7688 11.8895 23.9604C11.9285 23.9863 11.9738 24 12.0201 24C12.0664 24 12.1117 23.9863 12.1506 23.9604C13.849 22.7688 15.1414 21.0586 15.8457 19.0708C15.865 19.0344 15.8752 18.9935 15.8752 18.9519C15.8752 18.9104 15.865 18.8695 15.8457 18.8331C15.8247 18.7978 15.7952 18.7687 15.76 18.7488C15.7247 18.7288 15.6851 18.7187 15.6449 18.7194H8.40532Z" fill="white"/>
			<path d="M7.26064 12.7753C7.18893 12.7758 7.12033 12.8055 7.06986 12.858C7.04152 12.8778 7.0178 12.9038 7.00043 12.9342C6.98307 12.9646 6.97249 12.9986 6.96945 13.0337C7.01519 14.3566 7.1833 15.672 7.4715 16.962C7.48683 17.0184 7.51965 17.0682 7.56496 17.1036C7.61028 17.1391 7.66561 17.1583 7.72253 17.1584H16.1771C16.234 17.1583 16.2893 17.1391 16.3346 17.1036C16.3799 17.0682 16.4128 17.0184 16.4281 16.962C16.7434 15.6747 16.9384 14.3593 17.0105 13.0337C17.0139 13.0001 17.0102 12.9661 16.9998 12.934C16.9895 12.9019 16.9725 12.8725 16.9502 12.8477C16.9022 12.7977 16.8377 12.7681 16.7695 12.765L7.26064 12.7753Z" fill="white"/>
			<path d="M0.000995294 10.9663C-0.00199953 11.0015 0.00178017 11.0369 0.012118 11.0706C0.0224559 11.1043 0.0391488 11.1356 0.0612413 11.1627C0.111707 11.2151 0.180306 11.2449 0.25202 11.2454H5.27252C5.33819 11.2376 5.39854 11.2044 5.4414 11.1526C5.48426 11.1008 5.50644 11.0342 5.50347 10.9663C5.55269 9.68019 5.7072 8.4007 5.96535 7.14139C5.98209 7.1078 5.99082 7.07059 5.99082 7.03285C5.99082 6.9951 5.98209 6.95789 5.96535 6.9243C5.93472 6.88225 5.89235 6.85081 5.84391 6.83419C5.79548 6.81757 5.74326 6.81655 5.69425 6.83126H1.21596C1.16043 6.82211 1.10352 6.83242 1.05436 6.86054C1.0052 6.88865 0.966637 6.93295 0.94485 6.98633C0.413622 8.24838 0.094465 9.59416 0.000995294 10.9663Z" fill="white"/>
			<path d="M5.50347 13.0337C5.49857 12.9679 5.47026 12.9061 5.42396 12.8604C5.37765 12.8146 5.31659 12.788 5.25244 12.7856H0.231938C0.160224 12.7861 0.0916246 12.8159 0.0411593 12.8683C0.0106913 12.9175 -0.00340619 12.9756 0.000995293 13.0337C0.115807 14.4025 0.455324 15.7412 1.0051 16.993C1.02469 17.0392 1.057 17.0785 1.09804 17.1061C1.13908 17.1336 1.18705 17.1482 1.23604 17.1481H5.69425C5.7307 17.1477 5.76665 17.1393 5.7996 17.1232C5.83254 17.1071 5.8617 17.0839 5.88503 17.055C5.90176 17.0214 5.9105 16.9842 5.9105 16.9465C5.9105 16.9087 5.90176 16.8715 5.88503 16.8379C5.65497 15.5831 5.52734 14.3105 5.50347 13.0337Z" fill="white"/>
			<path d="M6.48749 18.8951C6.47051 18.8433 6.43805 18.7985 6.39475 18.7669C6.35145 18.7353 6.29955 18.7187 6.2465 18.7194H2.35059C2.30521 18.7181 2.2604 18.73 2.22132 18.7538C2.18224 18.7775 2.15048 18.8122 2.12969 18.8537C2.10461 18.8938 2.09127 18.9405 2.09127 18.9881C2.09127 19.0358 2.10461 19.0824 2.12969 19.1225C3.74768 21.4901 6.11555 23.2042 8.82704 23.9708C8.87957 23.9842 8.93484 23.9804 8.98521 23.96C9.03558 23.9397 9.07855 23.9037 9.10819 23.8571C9.14241 23.8131 9.16106 23.7584 9.16106 23.702C9.16106 23.6456 9.14241 23.591 9.10819 23.547C7.93911 22.194 7.0477 20.6117 6.48749 18.8951Z" fill="white"/>
			<path d="M17.7334 18.7194C17.6804 18.7187 17.6285 18.7353 17.5852 18.7669C17.5419 18.7985 17.5094 18.8433 17.4924 18.8951C16.9382 20.61 16.0537 22.1921 14.8918 23.547C14.8576 23.591 14.8389 23.6456 14.8389 23.702C14.8389 23.7584 14.8576 23.8131 14.8918 23.8571C14.9214 23.9037 14.9644 23.9397 15.0148 23.96C15.0652 23.9804 15.1204 23.9842 15.173 23.9708C17.8845 23.2042 20.2523 21.4901 21.8703 19.1225C21.8945 19.084 21.9074 19.0391 21.9074 18.9933C21.9074 18.9474 21.8945 18.9026 21.8703 18.8641C21.852 18.8198 21.8211 18.7822 21.7817 18.7564C21.7423 18.7305 21.6961 18.7176 21.6494 18.7194H17.7334Z" fill="white"/>
			<path d="M6.2465 5.28064C6.29955 5.28133 6.35145 5.26469 6.39475 5.23312C6.43805 5.20155 6.47051 5.15666 6.48749 5.10491C7.04171 3.39003 7.92622 1.80786 9.08811 0.453047C9.12233 0.409044 9.14097 0.354355 9.14097 0.297985C9.14097 0.241616 9.12233 0.186927 9.08811 0.142923C9.06063 0.101862 9.0226 0.0694802 8.97827 0.0493985C8.93394 0.0293168 8.88505 0.0223271 8.83708 0.0292112C6.12559 0.795754 3.75772 2.50987 2.13973 4.87748C2.11552 4.91597 2.10265 4.96085 2.10265 5.0067C2.10265 5.05256 2.11552 5.09743 2.13973 5.13592C2.15799 5.18023 2.18889 5.21779 2.22833 5.24363C2.26778 5.26947 2.31391 5.28238 2.36063 5.28064H6.2465Z" fill="white"/>
			<path d="M23.9789 13.0337C23.9819 12.9985 23.9781 12.9631 23.9678 12.9294C23.9575 12.8957 23.9408 12.8644 23.9187 12.8373C23.8682 12.7849 23.7996 12.7551 23.7279 12.7546H18.7074C18.6432 12.757 18.5822 12.7836 18.5359 12.8293C18.4896 12.8751 18.4613 12.9368 18.4564 13.0027C18.4154 14.2986 18.2677 15.5885 18.0146 16.8586C17.9978 16.8922 17.9891 16.9294 17.9891 16.9672C17.9891 17.0049 17.9978 17.0421 18.0146 17.0757C18.0379 17.1045 18.067 17.1278 18.1 17.1439C18.1329 17.1599 18.1689 17.1684 18.2053 17.1687H22.6836C22.7326 17.1689 22.7806 17.1543 22.8216 17.1268C22.8627 17.0992 22.895 17.0599 22.9146 17.0137C23.4873 15.7593 23.8473 14.4132 23.9789 13.0337Z" fill="white"/>
			<path d="M17.4924 5.10491C17.5094 5.15666 17.5419 5.20155 17.5852 5.23312C17.6285 5.26469 17.6804 5.28133 17.7334 5.28064H21.6293C21.6747 5.28194 21.7195 5.27001 21.7586 5.24624C21.7977 5.22246 21.8294 5.1878 21.8502 5.14626C21.8753 5.10619 21.8886 5.05954 21.8886 5.01187C21.8886 4.96421 21.8753 4.91755 21.8502 4.87748C20.2297 2.50792 17.858 0.793594 15.1428 0.0292112C15.0903 0.0158283 15.035 0.0195823 14.9847 0.0399538C14.9343 0.0603254 14.8913 0.0963077 14.8617 0.142923C14.8275 0.186927 14.8088 0.241616 14.8088 0.297985C14.8088 0.354355 14.8275 0.409044 14.8617 0.453047C16.0344 1.80514 16.9292 3.3875 17.4924 5.10491Z" fill="white"/>
			</svg>
			`,
				icons: [
					{
						name: "g-kubernetes",
						source: `<svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24"><defs><style>.cls-1{fill:#4285f4;}.cls-1,.cls-2,.cls-4{fill-rule:evenodd;}.cls-2{fill:#669df6;}.cls-3,.cls-4{fill:#aecbfa;}</style></defs><title>Icon_24px_K8Engine_Color</title><g data-name="Product Icons"><g ><polygon class="cls-1" points="14.68 13.06 19.23 15.69 19.23 16.68 14.29 13.83 14.68 13.06"/><polygon class="cls-2" points="9.98 13.65 4.77 16.66 4.45 15.86 9.53 12.92 9.98 13.65"/><rect class="cls-3" x="11.55" y="3.29" width="0.86" height="5.78"/><path class="cls-4" d="M3.25,7V17L12,22l8.74-5V7L12,2Zm15.63,8.89L12,19.78,5.12,15.89V8.11L12,4.22l6.87,3.89v7.78Z"/><polygon class="cls-4" points="11.98 11.5 15.96 9.21 11.98 6.91 8.01 9.21 11.98 11.5"/><polygon class="cls-2" points="11.52 12.3 7.66 10.01 7.66 14.6 11.52 16.89 11.52 12.3"/><polygon class="cls-1" points="12.48 12.3 12.48 16.89 16.34 14.6 16.34 10.01 12.48 12.3"/></g></g></svg>`
					},
					{
						name: "g-catalog",
						source: `<svg version="1.1" baseProfile="tiny" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
						x="0px" y="0px" width="24px" height="24px" viewBox="0 0 24 24" overflow="visible" xml:space="preserve">
				   <g >
					   <rect y="0" fill="none" width="24" height="24"/>
					   <g transform="translate(3.000000, 4.000000)">
						   <path fill="#3367D6" d="M9.9,13.6c0.3,1.2,1.4,2.1,2.7,2.1c1.6,0,2.8-1.3,2.8-2.8s-1.3-2.8-2.8-2.8
							   c-1.3,0-2.4,0.9-2.7,2.1H2.6v1.5H9.9z M18.8,17.8H-0.8V7.2h5.2L6,8.8h3h3l1.5-1.5h5.2V17.8z M4.9,13.6H3.4v1.5h1.5V13.6z
								M7.1,13.6H5.6v1.5h1.5V13.6z M11.2,12.9c0,0.8,0.6,1.4,1.4,1.4s1.4-0.6,1.4-1.4s-0.6-1.4-1.4-1.4S11.2,12.1,11.2,12.9z"/>
						   <polygon fill="#5C85DE" points="8.2,8 6.4,8 5.1,6.5 0.8,6.5 0.8,3.5 8.2,3.5 		"/>
						   <polygon id="Shape-Copy-2" fill="#85A4E6" points="12.8,6.8 11.5,8 9,8 9,2.8 3,2.8 3,1.2 12.8,1.2 		"/>
						   <polygon id="Shape-Copy-3" fill="#85A4E6" points="17.2,6.5 13.5,6.5 13.5,0.5 6.8,0.5 6.8,-1 17.2,-1 		"/>
					   </g>
				   </g>
				   </svg>`
					}
				]
			}
		];

		return html`
			<f-div width="100%" align="top-left" padding="large">
				<f-div width="hug-content" align="top-left">
					<f-icon-picker
						.categories=${categories}
						.value=${args.value}
						.state=${args.state}
						.size=${args.size}
						.placeholder=${args.placeholder}
						.category=${args.category}
						.variant=${args.variant}
						.recent=${args.recent}
						.include=${args.include}
						.exclude=${args.exclude}
						.exclude-emojis=${args["exclude-emojis"]}
						.custom=${args.custom}
						?disabled=${args.disabled}
						?clear=${args.clear}
						?resizable=${args.resizable}
						.close-on-select=${args["close-on-select"]}
						@input=${handleInput}
					>
						<f-text slot="label" variant="para" size="small">Label</f-text>
						<f-text slot="help" variant="para" size="small">Help!</f-text>
					</f-icon-picker>
				</f-div>
			</f-div>
		`;
	},

	name: "Playground",

	argTypes: {
		value: {
			control: "text"
		},

		placeholder: {
			control: "text"
		},

		variant: {
			control: "select",
			options: ["curved", "round", "block"]
		},

		category: {
			control: "select",
			options: ["fill", "transparent", "outline"]
		},

		state: {
			control: "select",
			options: ["default", "success", "primary", "warning", "danger"]
		},

		size: {
			control: "radio",
			options: ["small", "medium"]
		},

		disabled: {
			control: "boolean"
		},

		clear: {
			control: "boolean"
		}
	},

	args: {
		value: undefined,
		placeholder: undefined,
		variant: "round",
		category: "fill",
		state: "default",
		size: "medium",
		disabled: false,
		clear: true
	}
};

export const Variant = {
	render: () => {
		const variants = ["curved", "round", "block"];

		const value = "i-plus";
		const handleValue = (e: CustomEvent) => {
			console.log("input event", e);
		};

		return html`
			<f-div width="100%" align="middle-center" padding="large" gap="medium">
				${variants.map(
					item => html`<f-div width="hug-content">
      <f-icon-picker
      value=${value}
            @input=${handleValue}
            .variant=${item}
            size="medium"
            >
 <f-div slot="label" padding="none" gap="none">Label</f-div>
            <f-text slot="help" variant="para" size="small">Help!</f-text>						</f-icon-picker>
      </f-div
        ></f-div
      >`
				)}
			</f-div>
		`;
	},

	name: "variant"
};

export const Category = {
	render: () => {
		const categories = ["fill", "outline", "transparent"];
		const value = "";

		const handleValue = (e: CustomEvent) => {
			console.log("input event", e);
		};

		return html`
			<f-div width="100%" align="middle-center" padding="large" gap="medium">
				${categories.map(
					item => html`<f-div width="hug-content">
          <f-icon-picker
            value=${value}
            @input=${handleValue}
            .category=${item}
            size="medium"
            .variant=${item === "transparent" ? "block" : "curved"}
          >
 <f-div slot="label" padding="none" gap="none">Label</f-div>
            <f-text slot="help" variant="para" size="small">Help!</f-text>
          </f-icon-picker></f-div
        ></f-div
      >`
				)}
			</f-div>
		`;
	},

	name: "category"
};

export const Value = {
	render: () => {
		const value = "⌛";

		const handleValue = (e: CustomEvent) => {
			console.log("input event", e);
		};

		return html`
			<f-div width="100%" align="middle-center" padding="large">
				<f-div width="hug-content" align="middle-center">
					<f-icon-picker value=${value} @input=${handleValue} size="medium">
						<f-div slot="label" padding="none" gap="none">Label</f-div>
						<f-text slot="help" variant="para" size="small">Help!</f-text>
					</f-icon-picker></f-div
				></f-div
			>
		`;
	},

	name: "value"
};

export const Placeholder = {
	render: () => {
		const value = "";

		const handleValue = (e: CustomEvent) => {
			console.log("input event", e);
		};

		return html`
			<f-div width="100%" align="middle-center" padding="large">
				<f-div width="hug-content" align="middle-center">
					<f-icon-picker value=${value} placeholder="🧭" @input=${handleValue} size="medium">
						<f-div slot="label" padding="none" gap="none">Label</f-div>
						<f-text slot="help" variant="para" size="small">Help!</f-text>
					</f-icon-picker></f-div
				></f-div
			>
		`;
	},

	name: "placeholder"
};

export const Size = {
	render: () => {
		const sizes = ["small", "medium"];
		const value = "";

		const handleValue = (e: CustomEvent) => {
			console.log("input event", e);
		};

		return html`
			<f-div width="100%" align="top-center" padding="large" gap="medium">
				${sizes.map(
					item => html`<f-div width="hug-content">
          <f-icon-picker
            value=${value}
            @input=${handleValue}
            size=${item}
          >
           <f-div slot="label" padding="none" gap="none">Label</f-div>
            <f-text slot="help" variant="para" size="small">Help!</f-text>
          </f-icon-picker></f-div
        ></f-div
      >`
				)}
			</f-div>
		`;
	},

	name: "size"
};

export const State = {
	render: () => {
		const states = [
			["default", "primary", "success"],
			["danger", "warning", "default"]
		];
		const value = "";

		const handleValue = (e: CustomEvent) => {
			console.log("input event", e);
		};

		return html`
			<f-div direction="column" gap="medium">
				${states.map(
					item =>
						html` <f-div align="middle-center" padding="large" gap="medium">
							${item.map(
								state =>
									html`<f-div width="hug-content"
										><f-icon-picker
											value=${value}
											@input=${handleValue}
											size="medium"
											state=${state}
										>
											<f-div slot="label" padding="none" gap="none">Label</f-div>
											<f-text slot="help" variant="para" size="small">Help!</f-text>
										</f-icon-picker></f-div
									>`
							)}
						</f-div>`
				)}
			</f-div>
		`;
	},

	name: "state"
};

export const Flags = {
	render: () => {
		const value = "";

		const handleValue = (e: CustomEvent) => {
			console.log("input event", e);
		};

		return html` <f-div width="100%" align="middle-center" padding="large">
			<f-div direction="column">
				<f-text>disabled=true</f-text>
				<f-div width="hug-content" align="middle-center">
					<f-icon-picker value=${value} @input=${handleValue} size="medium" ?disabled=${true}>
						<f-div slot="label" padding="none" gap="none">Label</f-div>
						<f-text slot="help" variant="para" size="small">Help!</f-text>
					</f-icon-picker></f-div
				>
			</f-div>
			<f-div direction="column">
				<f-text>clear=false</f-text>
				<f-div width="hug-content" align="middle-center">
					<f-icon-picker value=${value} @input=${handleValue} size="medium" .clear=${false}>
						<f-div slot="label" padding="none" gap="none">Label</f-div>
						<f-text slot="help" variant="para" size="small">Help!</f-text>
					</f-icon-picker></f-div
				>
			</f-div>
			<f-div direction="column">
				<f-text>close-on-select=true</f-text>
				<f-div width="hug-content" align="middle-center">
					<f-icon-picker
						value=${value}
						@input=${handleValue}
						size="medium"
						.close-on-select=${true}
					>
						<f-div slot="label" padding="none" gap="none">Label</f-div>
						<f-text slot="help" variant="para" size="small">Help!</f-text>
					</f-icon-picker></f-div
				>
			</f-div>
		</f-div>`;
	},

	name: "Flags"
};
