export default function getFormattedBytes(size: number, sizeType = "b") {
	if (sizeType.toLowerCase() === "b") {
		return size;
	} else if (sizeType.toLowerCase() === "kb") {
		let Bytes = 0;
		// Calculates Bytes
		// 1 KB = 1024 bytes
		Bytes = size * 1024;
		return Bytes;
	} else if (sizeType.toLowerCase() === "mb") {
		let Bytes = 0;
		// Calculates Bytes
		// 1 MB = 1048576 bytes
		Bytes = size * 1048576;
		return Bytes;
	} else if (sizeType.toLowerCase() === "gb") {
		let Bytes = 0;
		// Calculates Bytes
		// 1 GB = 1073741824 bytes
		Bytes = size * 1073741824;
		return Bytes;
	} else {
		let Bytes = 0;
		// Calculates Bytes
		// 1 TB = 1099511627776 bytes
		Bytes = size * 1099511627776;
		return Bytes;
	}
}
