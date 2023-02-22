import { html, unsafeCSS } from "lit";
import { customElement, property, query, queryAssignedElements, state } from "lit/decorators.js";
import eleStyle from "./f-file-upload.scss";
import { FRoot } from "../../mixins/components/f-root/f-root";
import { ref, createRef, Ref } from "lit/directives/ref.js";
import { FDiv } from "../f-div/f-div";
import { FText } from "../f-text/f-text";
import { getFormattedBytes } from "../../utils/index";

export type FFileUploadState = "primary" | "default" | "success" | "warning" | "danger";

export type FFileUploadValueType = File | File[];

export type FFileUploadFileType = string | "all";

export type FFileUploadSizeProp =
	| `${number} B`
	| `${number} KB`
	| `${number} MB`
	| `${number} GB`
	| `${number} TB`;

@customElement("f-file-upload")
export class FFileUpload extends FRoot {
	/**
	 * css loaded from scss file
	 */
	static styles = [unsafeCSS(eleStyle), ...FDiv.styles, ...FText.styles];

	@property({ reflect: true, type: String })
	type?: "single" | "multiple" = "single";

	@property({ reflect: true, type: Array })
	value?: FFileUploadValueType;

	@property({ reflect: true, type: String })
	placeholder?: string;

	@property({ reflect: true, type: String, attribute: "file-type" })
	fileType?: FFileUploadFileType;

	@property({ reflect: true, type: String })
	size?: "medium" | "small";

	@property({ reflect: true, type: String })
	state?: FFileUploadState = "default";

	@property({ reflect: true, type: String, attribute: "max-size" })
	maxSize?: FFileUploadSizeProp;

	@state()
	bytes = 0;

	@state()
	sizeLimitFlag = true;

	@state()
	acceptedFilesFlag = true;

	@query(".f-file-upload")
	fileUploadSection!: HTMLElement;

	@query("#overflow-text")
	textOverflow!: FText;

	@queryAssignedElements({ slot: "label" })
	_labelNodes!: NodeListOf<HTMLElement>;

	@state()
	_hasLabel = false;

	@queryAssignedElements({ slot: "description" })
	_descriptionNodes!: NodeListOf<HTMLElement>;

	@state()
	_hasDescription = false;

	@queryAssignedElements({ slot: "help" })
	_helpNodes!: NodeListOf<HTMLElement>;

	@state()
	_hasHelperText = false;

	selectedFiles?: File[] = [];

	fileInputRef: Ref<HTMLInputElement> = createRef();

	handleClick() {
		const fileInput = this.fileInputRef.value as HTMLInputElement;
		fileInput.value = "";
		fileInput.click();
		this.acceptedFilesFlag = true;
		this.sizeLimitFlag = true;
	}

	dropFile(e: DragEvent) {
		e.preventDefault();
		const files = e.dataTransfer?.files;
		const filesArr = files ? Array.from(files) : [];
		if (this.fileType !== "all") {
			this.acceptedFilesFlag = filesArr.every(
				item => item.type && this.fileType?.includes(item.type.split("/")[1])
			);
		}
		this.sizeLimitFlag =
			this.maxSize && this.bytes ? filesArr.every(item => item.size < this.bytes) : true;
		if (this.acceptedFilesFlag && this.sizeLimitFlag) {
			if (this.type === "multiple") {
				filesArr.forEach(item => {
					this.selectedFiles?.push(item);
				});
			} else {
				if (filesArr?.length === 1) {
					this.selectedFiles = filesArr;
				}
			}
			/**
			 * input event for validation
			 *
			 * @event input
			 */
			this.dispatchOnInput(e);
		}
	}

	selectFile(e: InputEvent) {
		const fileInput = this.fileInputRef.value as HTMLInputElement;
		const files = fileInput.files;
		const filesArr = files ? Array.from(files) : [];
		this.sizeLimitFlag =
			this.maxSize && this.bytes ? filesArr.every(item => item.size < this.bytes) : true;
		if (this.sizeLimitFlag) {
			if (this.type === "multiple") {
				filesArr.forEach(item => {
					this.selectedFiles?.push(item);
				});
			} else {
				this.selectedFiles = filesArr;
			}
			this.dispatchOnInput(e);
		}
	}

	dispatchOnInput(e: Event) {
		e.stopPropagation();
		const event = new CustomEvent("input", {
			detail: {
				value:
					this.type === "single"
						? this.selectedFiles
							? this.selectedFiles[0]
							: []
						: this.selectedFiles
			},
			bubbles: true,
			composed: true
		});
		this.value =
			this.type === "single"
				? this.selectedFiles
					? this.selectedFiles[0]
					: []
				: this.selectedFiles;
		this.dispatchEvent(event);
		this.requestUpdate();
	}

	handleRemoveFile(e: MouseEvent) {
		e.stopPropagation();
		this.acceptedFilesFlag = true;
		this.sizeLimitFlag = true;
		this.selectedFiles = [];
		this.dispatchOnInput(e);
	}

	handleRemoveRespectiveFile(e: MouseEvent, file: File) {
		if (this.selectedFiles && this.selectedFiles?.length > 0) {
			this.selectedFiles = this.selectedFiles.filter(item => item.name !== file.name);
			this.dispatchOnInput(e);
		}
	}

	checkOverflowing() {
		if (this.textOverflow) {
			if (this.textOverflow.offsetWidth < this.textOverflow.scrollWidth) {
				this.textOverflow.tooltip = this.textOverflow.innerHTML;
			} else {
				this.textOverflow.tooltip = "";
			}
		}
	}

	handleMouseEnter(e: MouseEvent) {
		const element = e.target as HTMLElement;
		if (element?.offsetWidth < element?.scrollWidth) {
			(e.target as FText).tooltip = (e.target as FText).innerText;
		} else {
			(e.target as FText).tooltip = "";
		}
	}

	_onLabelSlotChange() {
		this._hasLabel = this._labelNodes.length > 0;
	}
	_onDescriptionSlotChange() {
		this._hasDescription = this._descriptionNodes.length > 0;
	}
	_onHelpSlotChange() {
		this._hasHelperText = this._helpNodes.length > 0;
	}

	isLetter(str: string) {
		if (str.length === 1 && str.match(/[a-z]/i)) return true;
		else return false;
	}

	split(str: string, index: number) {
		const result = [str.slice(0, index), str.slice(index)];
		return result;
	}

	render() {
		const maxSizeTemp = this.maxSize?.split(" ").join("");
		if (maxSizeTemp) {
			let numberEndIndex = maxSizeTemp?.length;
			for (let i = 0; i < maxSizeTemp.length; i++) {
				if (this.isLetter(maxSizeTemp.charAt(i))) {
					numberEndIndex = i;
					break;
				}
			}
			const [size, sizeType] = this.split(maxSizeTemp, numberEndIndex);
			const bytes = getFormattedBytes(Number(size), sizeType);
			this.bytes = bytes;
		}
		// render empty string, since there no need of any child element
		return html`
			<f-div direction="column" width="100%">
				<f-div padding="none" gap="none" align="bottom-left">
					<f-div padding="none" direction="column" width="fill-container">
						<f-div
							padding="none"
							gap="small"
							direction="row"
							width="hug-content"
							height="hug-content"
						>
							<f-div padding="none" direction="row" width="hug-content" height="hug-content">
								<slot name="label" @slotchange=${this._onLabelSlotChange}></slot>
							</f-div>
							<slot name="icon-tooltip"></slot>
						</f-div>
						${this._hasLabel ? html` <f-spacer size="4px"></f-spacer>` : ""}
						<slot name="description" @slotchange=${this._onDescriptionSlotChange}></slot>
						${this._hasDescription ? html` <f-spacer size="4px"></f-spacer>` : ""}
					</f-div>
					<f-div direction="column" width="hug-content">
						<f-div gap="none" width="hug-content">
							${this.maxSize
								? html` <f-text variant="para" size="small" weight="regular" state="secondary"
										>${this.type === "single" ? "Max Size: " : "Max Size/file: "}${this
											.maxSize}</f-text
								  >`
								: null}
						</f-div>
						${this.maxSize ? html` <f-spacer size="4px"></f-spacer>` : ""}
					</f-div>
				</f-div>
				<f-div direction="column" width="100%">
					<div
						class="f-file-upload"
						tabindex="1"
						state=${this.state}
						@click=${this.handleClick}
						@drop=${this.dropFile}
						@dragover=${(e: DragEvent) => {
							e.preventDefault();
						}}
					>
						${this.type === "single"
							? this.value
								? html`<f-div width="80%"
										><f-text
											variant="para"
											size="medium"
											weight="regular"
											?ellipsis=${true}
											id="overflow-text"
											>${(this.value as File)?.name}</f-text
										></f-div
								  >`
								: html`<div class="f-file-upload-placeholder">
										<f-text variant="para" size="medium" weight="regular"
											>${this.placeholder}</f-text
										>
										<f-text variant="para" size="medium" weight="regular" state="secondary"
											>${this.fileType === "all"
												? `(All formats supported)`
												: `(${this.fileType})`}</f-text
										>
								  </div>`
							: html`<div class="f-file-upload-placeholder">
									<f-text variant="para" size="medium" weight="regular">${this.placeholder}</f-text>
									<f-text variant="para" size="medium" weight="regular" state="secondary"
										>${this.fileType === "all"
											? `(All formats supported)`
											: `(${this.fileType})`}</f-text
									>
							  </div>`}
						${this.type === "single" && this.value
							? html`<f-icon
									source="i-close"
									size="medium"
									@click=${this.handleRemoveFile}
									clickable
							  ></f-icon>`
							: html`<f-icon source="i-upload" size="large" clickable></f-icon>`}
						<input
							${ref(this.fileInputRef)}
							accept=${this.fileType === "all" ? "*/*" : this.fileType}
							type="file"
							?multiple=${this.type === "multiple" ? true : false}
							@input=${this.selectFile}
						/>
					</div>
					<f-div direction="column">
						${this._hasHelperText ? html`<f-spacer size="6px"></f-spacer>` : ""}
						${this.sizeLimitFlag && this.acceptedFilesFlag
							? html`<slot name="help" @slotchange=${this._onHelpSlotChange}></slot>`
							: html` ${!this.acceptedFilesFlag
									? html` <f-spacer size="6px"></f-spacer>
											<f-text variant="para" size="small" weight="regular" state="danger"
												>${this.type === "single"
													? "File format not supported"
													: "One or more file formats not supported"}</f-text
											>`
									: !this.sizeLimitFlag
									? html` <f-spacer size="6px"></f-spacer>
											<f-text variant="para" size="small" weight="regular" state="danger"
												>${this.type === "single"
													? "File Size too large"
													: "One or more files are too large"}</f-text
											>`
									: ""}`}
						${this.type === "multiple" && (this.value as File[])?.length > 0
							? html`<f-spacer size="6px"></f-spacer>`
							: ""}
					</f-div>
					<f-div direction="column" width="100%" gap="small">
						${this.type === "multiple"
							? (this.value as File[])?.length > 0
								? html`${(this.value as File[]).map(
										item =>
											html`<f-div padding="medium" state="tertiary" variant="curved" gap="auto">
												<f-div width="80%">
													<f-text
														variant="para"
														size="medium"
														weight="regular"
														?ellipsis=${true}
														@mouseenter=${this.handleMouseEnter}
														>${item.name}</f-text
													>
												</f-div>
												<f-icon
													source="i-close"
													size="medium"
													clickable
													@click=${(e: MouseEvent) => this.handleRemoveRespectiveFile(e, item)}
												></f-icon>
											</f-div>`
								  )}`
								: ""
							: ""}
					</f-div>
				</f-div>
			</f-div>
		`;
	}
	updated() {
		this.selectedFiles = this.value
			? Array.isArray(this.value)
				? this.value
				: ([this.value] as File[])
			: [];
		this.checkOverflowing();
		if (this.acceptedFilesFlag && this.sizeLimitFlag) {
			this.fileUploadSection.removeAttribute("data-state");
		} else {
			this.fileUploadSection.setAttribute("data-state", "danger");
		}
	}
}

/**
 * Required for typescript
 */
declare global {
	interface HTMLElementTagNameMap {
		"f-file-upload": FFileUpload;
	}
}
