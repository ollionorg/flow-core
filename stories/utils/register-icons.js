import SystemIconPack from "@ollion/flow-system-icon/dist/types/icon-pack";
import ProductIconPack from "@ollion/flow-product-icon/dist/types/icon-pack";
import GcpIconPack from "@ollion/flow-gcp-icon/dist/types/icon-pack";
import AwsIconPack from "@ollion/flow-aws-icon/dist/types/icon-pack";

import { ConfigUtil } from "@nonfx/flow-core-config";

ConfigUtil.setConfig({
	iconPack: {
		...SystemIconPack,
		...ProductIconPack,
		...GcpIconPack,
		...AwsIconPack
	}
});

export {};
