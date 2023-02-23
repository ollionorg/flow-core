import { html, unsafeCSS } from "lit";
import { customElement, property, query, queryAssignedElements, state } from "lit/decorators.js";
import eleStyle from "./f-file-upload.scss";
import { FRoot } from "../../mixins/components/f-root/f-root";
import { ref, createRef, Ref } from "lit/directives/ref.js";
import { FDiv } from "../f-div/f-div";
import { FText } from "../f-text/f-text";
import { getFormattedBytes } from "../../utils/index";
import { unsafeSVG } from "lit-html/directives/unsafe-svg.js";
import loader from "../../mixins/svg/loader";

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

	/**
	 * @attribute f-file-upload has 2 type of modes: single and multiple. When type is single, a user can select only one file and the filename appears inline to the file uploader.  When type is multiple, a user can select multiple files and each filename stacks under the file uploader.
	 */
	@property({ reflect: true, type: String })
	type?: "single" | "multiple" = "single";

	/**
	 * @attribute Defines the return value of f-file-uploader. When type is single, return value is single file object instance. When type is multiple, return value is an array of file object instances.
	 */
	@property({ reflect: true, type: Array })
	value?: FFileUploadValueType;

	/**
	 * @attribute Defines the placeholder text for f-file-upload. Note: Placeholder is replaced by file name when type is single.
	 */
	@property({ reflect: true, type: String })
	placeholder?: string;

	/**
	 * @attribute Users can limit the file types by setting the file-type property to a string containing the allowed file type(s). To specify more than one type, separate the values with a comma. Acceptable file formats are displayed in brackets under description.
	 */
	@property({ reflect: true, type: String, attribute: "file-type" })
	fileType?: FFileUploadFileType = "all";

	/**
	 * @attribute f-file-upload can have 2 sizes. Note: Font styles are same in both sizes. Only paddings and gaps are different
	 */
	@property({ reflect: true, type: String })
	size?: "medium" | "small" = "medium";

	/**
	 * @attribute States are used to communicate purpose and connotations. For example, a red color connotes danger, whereas a green color connotes success and so on.
	 */
	@property({ reflect: true, type: String })
	state?: FFileUploadState = "default";

	/**
	 * @attribute This shows the maximum file size allowed per file
	 */
	@property({ reflect: true, type: String, attribute: "max-size" })
	maxSize?: FFileUploadSizeProp;

	/**
	 * @attribute Sets the file-upload to disabled state.
	 */
	@property({ reflect: true, type: Boolean })
	disabled?: boolean = false;

	/**
	 * @attribute Sets the file-upload to loading state
	 */
	@property({ reflect: true, type: Boolean })
	loading?: boolean = false;

	/**
	 * @attribute local reactive state for checking bytes
	 */
	@state()
	bytes = 0;

	/**
	 * @attribute max-size limit flag
	 */
	@state()
	sizeLimitFlag = true;

	/**
	 * @attribute file acceptance flag
	 */
	@state()
	acceptedFilesFlag = true;

	/**
	 * @attribute query selector for class `.f-file-upload`
	 */
	@query(".f-file-upload")
	fileUploadSection!: HTMLElement;

	/**
	 * @attribute query selector for id #overflow-text
	 */
	@query("#overflow-text")
	textOverflow!: FText;

	/**
	 * @attribute assigned elements inside slot label
	 */
	@queryAssignedElements({ slot: "label" })
	_labelNodes!: NodeListOf<HTMLElement>;

	/**
	 * @attribute flag to check if slot label is present or not
	 */
	@state()
	_hasLabel = false;

	/**
	 * @attribute assigned elements inside slot description
	 */
	@queryAssignedElements({ slot: "description" })
	_descriptionNodes!: NodeListOf<HTMLElement>;

	/**
	 * @attribute flag to check if slot description is present or not
	 */
	@state()
	_hasDescription = false;

	/**
	 * @attribute assigned elements inside slot help
	 */
	@queryAssignedElements({ slot: "help" })
	_helpNodes!: NodeListOf<HTMLElement>;

	/**
	 * @attribute flag to check if slot help is present or not
	 */
	@state()
	_hasHelperText = false;

	selectedFiles?: File[] = [];

	fileInputRef: Ref<HTMLInputElement> = createRef();

	/**
	 * on click open file selector window on OS
	 */
	handleClick() {
		if (!this.loading) {
			const fileInput = this.fileInputRef.value as HTMLInputElement;
			fileInput.value = "";
			fileInput.click();
			this.acceptedFilesFlag = true;
			this.sizeLimitFlag = true;
		}
	}

	/**
	 * @param e DragEvent
	 * drag and drop file(s) and event emission
	 */
	dropFile(e: DragEvent) {
		if (!this.loading) {
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
				this.dispatchOnInput(e);
			}
		}
	}

	/**
	 * select file(s) from browse options
	 * @param e InputEvent
	 */
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

	/**
	 * dispatch input event
	 * @param e Event
	 */
	dispatchOnInput(e: Event) {
		e.stopPropagation();
		/**
		 * @event input
		 */
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

	/**
	 * on click remove the selected single file
	 * @param e MouseEvent
	 */
	handleRemoveFile(e: MouseEvent) {
		e.stopPropagation();
		this.acceptedFilesFlag = true;
		this.sizeLimitFlag = true;
		this.selectedFiles = [];
		this.dispatchOnInput(e);
	}

	/**
	 * removes the clicked respective file from selection array
	 * @param e MouseEvent
	 * @param file contains clicked file
	 */
	handleRemoveRespectiveFile(e: MouseEvent, file: File) {
		if (this.selectedFiles && this.selectedFiles?.length > 0) {
			this.selectedFiles = this.selectedFiles.filter(item => item.name !== file.name);
			this.dispatchOnInput(e);
		}
	}

	/**
	 * check if ellipsis happens on text and insert tooltip
	 */
	checkOverflowing() {
		if (this.textOverflow) {
			if (this.textOverflow.offsetWidth < this.textOverflow.scrollWidth) {
				this.textOverflow.tooltip = this.textOverflow.innerHTML;
			} else {
				this.textOverflow.tooltip = "";
			}
		}
	}

	/**
	 * in multiple file selection hovering on the particular file name may open the tooltip -if ellipsis is present
	 * @param e MouseEvent
	 */
	handleMouseEnter(e: MouseEvent) {
		const element = e.target as HTMLElement;
		if (element?.offsetWidth < element?.scrollWidth) {
			(e.target as FText).tooltip = (e.target as FText).innerText;
		} else {
			(e.target as FText).tooltip = "";
		}
	}

	/**
	 * has label slot
	 */
	_onLabelSlotChange() {
		this._hasLabel = this._labelNodes.length > 0;
	}

	/**
	 * has description slot
	 */
	_onDescriptionSlotChange() {
		this._hasDescription = this._descriptionNodes.length > 0;
	}

	/**
	 * has help slot
	 */
	_onHelpSlotChange() {
		this._hasHelperText = this._helpNodes.length > 0;
	}

	/**
	 *
	 * @param str single character
	 * @returns boolea value if character present is alphabet or not
	 */
	isLetter(str: string) {
		if (str.length === 1 && str.match(/[a-z]/i)) return true;
		else return false;
	}

	/**
	 *
	 * @param str string
	 * @param index index to splice from
	 * @returns returns an array [number, characters]
	 */
	split(str: string, index: number) {
		const result = [str.slice(0, index), str.slice(index)];
		return result;
	}

	render() {
		//max-size removing space
		const maxSizeTemp = this.maxSize?.split(" ").join("");
		//seperating bytes value and byteType from max-size
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
						size=${this.size}
						?loading=${this.loading}
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
											size="small"
											weight="regular"
											?ellipsis=${true}
											id="overflow-text"
											>${(this.value as File)?.name}</f-text
										></f-div
								  >`
								: html`<div class="f-file-upload-placeholder" size=${this.size}>
										<f-text variant="para" size="small" weight="regular"
											>${this.placeholder}</f-text
										>
										<f-text variant="para" size="small" weight="regular" state="secondary"
											>${this.fileType === "all"
												? `(All formats supported)`
												: `(${this.fileType})`}</f-text
										>
								  </div>`
							: html`<div class="f-file-upload-placeholder" size=${this.size}>
									<f-text variant="para" size="small" weight="regular">${this.placeholder}</f-text>
									<f-text variant="para" size="small" weight="regular" state="secondary"
										>${this.fileType === "all"
											? `(All formats supported)`
											: `(${this.fileType})`}</f-text
									>
							  </div>`}
						${this.loading
							? html`<div class="loader-suffix" state=${this.state}>${unsafeSVG(loader)}</div>`
							: this.type === "single" && this.value
							? html`<f-icon
									source="i-close"
									size="small"
									@click=${this.handleRemoveFile}
									clickable
							  ></f-icon>`
							: html`<f-icon source="i-upload" size="medium" clickable></f-icon>`}
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
												<f-div width="80%" id="multiple-file-selection">
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
													size="small"
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
		//update the selectedFiles as per the value being fetched
		this.selectedFiles = this.value
			? Array.isArray(this.value)
				? this.value
				: ([this.value] as File[])
			: [];

		//check if ellipsis is present
		this.checkOverflowing();

		//if size limit exceeds or file doesn't support the format - danger state attribute is added
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
