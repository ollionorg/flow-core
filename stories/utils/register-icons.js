import SystemIconPack from "@cldcvr/flow-system-icon/dist/types/icon-pack";
import ProductIconPack from "@cldcvr/flow-product-icon/dist/types/icon-pack";
import GcpIconPack from "@cldcvr/flow-gcp-icon/dist/types/icon-pack";
import AwsIconPack from "@cldcvr/flow-aws-icon/dist/types/icon-pack";

import { ConfigUtil } from "@cldcvr/flow-core-config";

ConfigUtil.setConfig({
	iconPack: {
		...SystemIconPack,
		...ProductIconPack,
		...GcpIconPack,
		...AwsIconPack
	}
});

export {};
