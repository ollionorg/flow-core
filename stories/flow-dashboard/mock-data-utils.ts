import { TimeseriesData, TimeseriesPoint } from "@nonfx/flow-dashboard";
import { faker } from "@faker-js/faker";

export function getColor() {
	return "#" + Math.floor(faker.number.float({ min: 0, max: 1 }) * 16777215).toString(16);
}

export function generateTimeseriesChartData(
	from?: Date,
	seriesCount?: number,
	pointsCount?: number
): TimeseriesData[] {
	const startFrom = new Date().getTime();
	const masterData: TimeseriesData[] = [];

	const numberOfPoints = pointsCount ?? 150; //faker.number.int({ min: 50, max: 150 });
	const numberOfSeries = seriesCount ?? faker.number.int({ min: 1, max: 3 });
	const colors = [
		"#66c2ff",
		"#ff6666",
		"#99ff99",
		"#ffb366",
		"#cc99ff",
		"#99ccff",
		"#ffcc99",
		"#66ff99",
		"#ff99cc",
		"#ccccff"
	];
	const seriesColors = faker.helpers.arrayElements(colors, numberOfSeries);
	for (let j = 0; j < numberOfSeries; j++) {
		const startDate = from ? from.getTime() : startFrom;
		const points: TimeseriesPoint[] = [];
		for (let i = 0; i < numberOfPoints; i++) {
			const currentDate = startDate + i * 60 * 1000;
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
			seriesName: faker.location.country(),
			points,
			color: seriesColors[j],
			type: faker.helpers.arrayElement(["line", "bar", "area"])
		});
	}

	return masterData;
}

export function getRndInteger(min: number, max: number) {
	return faker.number.int({ min, max });
}
