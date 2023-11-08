import { FDashboardWidget } from "../../types";
// import axios from "axios";

type WidgetRegistryConfig = {
	widget: FDashboardWidget;
	timer?: number;
};
type WidgetRegistry = Record<string, WidgetRegistryConfig>;

/**
 * Widget registry to maintain its config and timer
 */
const widgetRegistry: WidgetRegistry = {};

/**
 * schedule polling
 * @param wgt : widget config
 */
function schedulePolling(wgt: FDashboardWidget) {
	if (!widgetRegistry[wgt.id]) {
		widgetRegistry[wgt.id] = { widget: wgt };
	} else {
		widgetRegistry[wgt.id].widget = wgt;
		if (widgetRegistry[wgt.id].timer) {
			clearInterval(widgetRegistry[wgt.id].timer);
		}
	}

	if (wgt.pollingConfig) {
		widgetRegistry[wgt.id].timer = setInterval(() => {
			void (async () => {
				if (wgt.pollingConfig) {
					// axios({
					// 	method:'get',
					// })
					wgt.data = await wgt.pollingConfig.callback();
					self.postMessage(wgt);
				}
			})();
		}, wgt.pollingConfig.frequency); //frequency
	}
}

/**
 * As sson as worker receives widget, it schedules polling for it.
 * @param e
 */
self.onmessage = (e: MessageEvent<FDashboardWidget>) => {
	schedulePolling(e.data);
};
