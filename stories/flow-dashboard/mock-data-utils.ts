import { TimeseriesData, TimeseriesPoint } from "@ollion/flow-dashboard";
import { faker } from "@faker-js/faker";

export function getColor() {
	return "#" + Math.floor(faker.number.float({ min: 0, max: 1 }) * 16777215).toString(16);
}
export function generateTimeseriesChartData(
	numPoints: number,
	from?: Date,
	noOfSeries: number = 1
): TimeseriesData[] {
	const startFrom = new Date().getTime();
	const masterData: TimeseriesData[] = [];
	const colors = [
		"#7fc97f",
		"#1f77b4",
		"#a703d5",
		"#ffff99",
		"#386cb0",
		"#f0027f",
		"#bf5b17",
		"#666666"
	];
	const seriesTypes: ("line" | "bar" | "area")[] = ["area", "bar", "line"];

	for (let j = 0; j < noOfSeries; j++) {
		const startDate = from ? from.getTime() : startFrom;
		const points: TimeseriesPoint[] = [];
		for (let i = 0; i < numPoints; i++) {
			const currentDate = startDate + i * 60 * 1000; // Incrementing date by one day
			let fluctuatingValue = Math.floor(faker.number.float({ min: 0, max: 1 }) * 10) + 50 * (j + 1); //faker.number.float({ min: 0, max: 1 }) * (yOffSet ?? 100) + Math.sin(i / 8) * 50; // Adding a sine wave for fluctuation
			if (fluctuatingValue < 0) {
				fluctuatingValue *= -1;
			}
			if (fluctuatingValue % 9 === 0) {
				fluctuatingValue = 50 * (j + 1) * getRndInteger(1, 2);
			}
			const dataPoint: TimeseriesPoint = {
				date: currentDate,
				value: +fluctuatingValue.toFixed(0)
			};

			points.push(dataPoint);
		}
		masterData.push({
			seriesName: `Series-${j + 1}`,
			points,
			color: colors[j] ?? getColor(),
			type: seriesTypes[j] ?? "line"
		});
	}

	return masterData;
}

export function getRndInteger(min: number, max: number) {
	return faker.number.int({ min, max });
}
