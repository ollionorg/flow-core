/* eslint-disable @typescript-eslint/ban-ts-comment */
import { html, fixture, expect } from "@open-wc/testing";

// import flow-core elements
import "../../../";
import { FLineage } from "../../../";

import { register, flowCoreElements } from "@ollion/flow-core";

register([...flowCoreElements, FLineage]);

describe("f-lineage", () => {
	it("is defined", () => {
		const el = document.createElement("f-lineage");
		expect(el).instanceOf(FLineage);
	});
	it("should match snpashot", async () => {
		const el = await fixture<FLineage>(html`
			<f-lineage
				.links=${[
					{
						from: "noede1",
						to: "node2"
					},
					{
						from: "node1",
						to: "node5"
					},
					{
						from: "node1",
						to: "node4"
					},
					{
						from: "node2",
						to: "node5"
					},
					{
						to: "node3",
						from: "node5"
					},
					{
						from: "node5",
						to: "node4"
					},
					{
						from: "node6",
						to: "node5"
					},
					{
						from: "node4child1",
						to: "node5child2"
					},
					{
						from: "node4child1",
						to: "node5child1"
					},
					{
						from: "node1child1",
						to: "node5child2"
					},
					{
						from: "node1child1",
						to: "node4child2"
					},
					{
						from: "node6",
						to: "node6"
					}
				]}
				.nodes=${{
					noede1: {
						fData: {
							fullName: "Node 1",
							description: "Movies",
							state: "secondary"
						},
						fChildren: {
							node1child1: {
								fData: {
									icon: "i-hashtag",
									title: "Node 1 child 1"
								}
							}
						}
					},
					node2: {
						fData: {
							fullName: "Node 2",
							description: "Hank Palmer",
							state: "custom,#006ecc"
						},
						fChildren: {
							node2child1: {
								fData: {
									icon: "i-hashtag",
									title: "node 2 child 1"
								}
							},
							node2child2: {
								fData: {
									icon: "i-paragraph",
									title: "node 2 child 2"
								}
							}
						},
						fHideChildren: false
					},
					node3: {
						fData: {
							fullName: "Node 3",
							description: "Hank Palmer",
							state: "custom,#006ecc"
						}
					},
					node4: {
						fData: {
							fullName: "Node 4",
							description: "Tony stark",
							state: "secondary"
						},
						fChildren: {
							node4child1: {
								fData: {
									icon: "i-hashtag",
									title: "node 4 child 1"
								}
							},
							node4child2: {
								fData: {
									icon: "i-paragraph",
									title: "node 4 child 2"
								}
							}
						},
						fHideChildren: false
					},
					node5: {
						fData: {
							fullName: "Node 5",
							description: "Actor",
							state: "secondary"
						},
						fChildren: {
							node5child1: {
								fData: {
									icon: "i-hashtag",
									title: "Node 5 child 1"
								}
							},
							node5child3: {
								fData: {
									icon: "i-hashtag",
									title: "Node 5 child 3"
								}
							},
							node5child2: {
								fData: {
									icon: "i-paragraph",
									title: "Node 5 child 2"
								}
							}
						},
						fHideChildren: false
					},
					node6: {
						fData: {
							fullName: "Node 6",
							description: "Hank Palmer",
							state: "custom,#006ecc"
						}
					}
				}}
			></f-lineage>
		`);

		await el.updateComplete;
		await new Promise(resolve => setTimeout(resolve, 5000));

		if (el.shadowRoot) {
			const svg = el.shadowRoot.querySelector("svg");
			expect(svg).lightDom.to.equalSnapshot();
		}
		//@ts-ignore
	}).timeout(15000);
});
