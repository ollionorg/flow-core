import jsPDF from "jspdf";

const downloadFile = () => {
	const elementHTML = document.querySelector("#reportTemplate") as HTMLElement;
	const doc = new jsPDF({ orientation: "l", unit: "px" });
	doc.html(elementHTML, {
		html2canvas: {
			scale: 0.25,
			async: true
		},
		callback: function (doc) {
			doc.save("sample-document.pdf");
		},
		x: 0,
		y: 0,
		width: elementHTML.scrollWidth,
		windowWidth: 2400
	});
};

export default downloadFile;
