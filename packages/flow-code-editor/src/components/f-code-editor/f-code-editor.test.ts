import { html, fixture, expect } from "@open-wc/testing";

// import flow-core elements
import "@cldcvr/flow-core";
import { FCodeEditor } from "@cldcvr/flow-code-editor";

describe("f-code-editor", () => {
	it("is defined", () => {
		const el = document.createElement("f-code-editor");
		expect(el).instanceOf(FCodeEditor);
	});
	it("should render scala code with syntax highlight", async () => {
		const el = await fixture(
			html` <f-code-editor
				.code=${`object ScalaExample{  
			def main(args:Array[String]){  
				println "Hello Scala"  
			}  
		}  `}
				.language=${"scala"}
			></f-code-editor>`
		);
		const smapleKeywordSpan = el.querySelector("span.mtk22");

		expect(smapleKeywordSpan?.textContent?.trim()).to.equal("ScalaExample");
	});
});
