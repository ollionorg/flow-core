export default function getExtensionsFromMimeType(mimeType: string) {
	console.log(mimeType);
	const mimeToExtensionsMap: Record<string, string[]> = {
		"application/msword": [".doc", ".dot"],
		"application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
		"application/vnd.openxmlformats-officedocument.wordprocessingml.template": [".dotx"],
		"application/vnd.ms-word.document.macroEnabled.12": [".docm"],
		"application/vnd.ms-word.template.macroEnabled.12": [".dotm"],
		"application/vnd.ms-excel": [".xls", ".xlt", ".xla"],
		"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
		"application/vnd.openxmlformats-officedocument.spreadsheetml.template": [".xltx"],
		"application/vnd.ms-excel.sheet.macroEnabled.12": [".xlsm"],
		"application/vnd.ms-excel.template.macroEnabled.12": [".xltm"],
		"application/vnd.ms-excel.addin.macroEnabled.12": [".xlam"],
		"application/vnd.ms-excel.sheet.binary.macroEnabled.12": [".xlsb"],
		"application/vnd.ms-powerpoint": [".ppt", ".pot", ".pps", ".ppa"],
		"application/vnd.openxmlformats-officedocument.presentationml.presentation": [".pptx"],
		"application/vnd.openxmlformats-officedocument.presentationml.template": [".potx"],
		"application/vnd.openxmlformats-officedocument.presentationml.slideshow": [".ppsx"],
		"application/vnd.ms-powerpoint.addin.macroEnabled.12": [".ppam"],
		"application/vnd.ms-powerpoint.presentation.macroEnabled.12": [".pptm"],
		"application/vnd.ms-powerpoint.template.macroEnabled.12": [".potm"],
		"application/vnd.ms-powerpoint.slideshow.macroEnabled.12": [".ppsm"],
		"application/vnd.ms-access": [".mdb"]
	};

	const mimeTypeArray = mimeType.split(",").map(item => item.trim());

	const mimeTypes = Object.keys(mimeToExtensionsMap);
	const extensions: string[] = [];

	// Iterate through the MIME types and add their extensions to the array
	mimeTypeArray.forEach(mimeType => {
		if (mimeType.startsWith(".")) {
			extensions.push(mimeType);
		} else if (mimeTypes.includes(mimeType)) {
			extensions.push(...mimeToExtensionsMap[mimeType]);
		} else {
			extensions.push(mimeType);
		}
	});

	return extensions.join(", ");
}
