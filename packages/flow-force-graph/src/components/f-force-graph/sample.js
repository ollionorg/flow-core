function _chart(d3, data, width, height, drag, invalidation) {
	const root = d3.hierarchy(data);
	const links = root.links();
	const nodes = root.descendants();

	const simulation = d3
		.forceSimulation(nodes)
		.force(
			"link",
			d3
				.forceLink(links)
				.id(d => d.id)
				.distance(0)
				.strength(1)
		)
		.force("charge", d3.forceManyBody().strength(-50))
		.force("x", d3.forceX())
		.force("y", d3.forceY());

	const svg = d3.create("svg").attr("viewBox", [-width / 2, -height / 2, width, height]);

	const link = svg
		.append("g")
		.attr("stroke", "#999")
		.attr("stroke-opacity", 0.6)
		.selectAll("line")
		.data(links)
		.join("line");

	const node = svg
		.append("g")
		.attr("fill", "#fff")
		.attr("stroke", "#000")
		.attr("stroke-width", 1.5)
		.selectAll("circle")
		.data(nodes)
		.join("circle")
		.attr("fill", d => (d.children ? null : "#000"))
		.attr("stroke", d => (d.children ? null : "#fff"))
		.attr("r", 3.5)
		.call(drag(simulation));

	node.append("title").text(d => d.data.name);

	simulation.on("tick", () => {
		link
			.attr("x1", d => d.source.x)
			.attr("y1", d => d.source.y)
			.attr("x2", d => d.target.x)
			.attr("y2", d => d.target.y);

		node.attr("cx", d => d.x).attr("cy", d => d.y);
	});

	invalidation.then(() => simulation.stop());

	return svg.node();
}

function _data(FileAttachment) {
	return FileAttachment("flare-2.json").json();
}

function _height() {
	return 600;
}

function _drag(d3) {
	return simulation => {
		function dragstarted(event, d) {
			if (!event.active) simulation.alphaTarget(0.3).restart();
			d.fx = d.x;
			d.fy = d.y;
		}

		function dragged(event, d) {
			d.fx = event.x;
			d.fy = event.y;
		}

		function dragended(event, d) {
			if (!event.active) simulation.alphaTarget(0);
			d.fx = null;
			d.fy = null;
		}

		return d3.drag().on("start", dragstarted).on("drag", dragged).on("end", dragended);
	};
}

function _d3(require) {
	return require("d3@6");
}

export default function define(runtime, observer) {
	const main = runtime.module();
	function toString() {
		return this.url;
	}
	const fileAttachments = new Map([
		[
			"flare-2.json",
			{
				url: new URL(
					"./files/e65374209781891f37dea1e7a6e1c5e020a3009b8aedf113b4c80942018887a1176ad4945cf14444603ff91d3da371b3b0d72419fa8d2ee0f6e815732475d5de.json",
					import.meta.url
				),
				mimeType: "application/json",
				toString
			}
		]
	]);
	main.builtin(
		"FileAttachment",
		runtime.fileAttachments(name => fileAttachments.get(name))
	);
	main.variable(observer()).define(["md"], _1);
	main
		.variable(observer("chart"))
		.define("chart", ["d3", "data", "width", "height", "drag", "invalidation"], _chart);
	main.variable(observer("data")).define("data", ["FileAttachment"], _data);
	main.variable(observer("height")).define("height", _height);
	main.variable(observer("drag")).define("drag", ["d3"], _drag);
	main.variable(observer("d3")).define("d3", ["require"], _d3);
	return main;
}
