import * as d3 from "d3";
import type { FLineage } from "../f-lineage";

export default function getProxies(element: FLineage) {
	/**
	 * whenever property of fData updated then it will be trapped here for update
	 */
	const templateDataProxy = {
		get: (target: Record<string, any>, key: string) => {
			if (key !== "__isProxy") {
				// eslint-disable-next-line @typescript-eslint/no-unsafe-return
				return target[key];
			}

			return true;
		},
		set(target: Record<string, any>, key: string, value: any) {
			target[key] = value;
			const lineageDrawParams = element.getDrawParams();

			if (lineageDrawParams) {
				const nodeElement = lineageDrawParams.lineage.nodes.find(n => n.id === target.__id__);
				if (nodeElement) {
					d3.select(element.svg)
						.select(`#${target.__id__}-foreign-object`)
						.call(function (d) {
							element.doTemplateHotUpdate(
								nodeElement,
								d.node() as unknown as HTMLElement,
								nodeElement.isChildren
							);
						});
				}
			}

			return true;
		}
	};

	/**
	 * whenever new fData assigned then it will be trapped here for update
	 */
	const nodeDataProxy = {
		get: (target: Record<string, any>, key: string) => {
			if (key !== "__isProxy") {
				// eslint-disable-next-line @typescript-eslint/no-unsafe-return
				return target[key];
			}

			return true;
		},
		set(target: Record<string, any>, key: string, value: any) {
			target[key] = value;

			if (key === "fData") {
				const lineageDrawParams = element.getDrawParams();

				if (lineageDrawParams) {
					const nodeElement = lineageDrawParams.lineage.nodes.find(n => n.id === target.__id__);

					if (nodeElement) {
						target[key].__id__ = target.__id__;
						target[key] = new Proxy(target[key], templateDataProxy);
						nodeElement.fData = target[key];
						d3.select(element.svg)
							.select(`#${target.__id__}-foreign-object`)
							.call(function (d) {
								element.doTemplateHotUpdate(
									nodeElement,
									d.node() as unknown as HTMLElement,
									nodeElement.isChildren
								);
							});
					}
				}
			}
			return true;
		}
	};

	return {
		templateDataProxy,
		nodeDataProxy
	};
}
