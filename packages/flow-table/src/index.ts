import { FTableSchema } from "./components/f-table-schema/f-table-schema";
import { FTable } from "./components/f-table/f-table";
import { FTcell } from "./components/f-tcell/f-tcell";
import { FTrow } from "./components/f-trow/f-trow";

export * from "./components/f-table/f-table";
export * from "./components/f-trow/f-trow";
export * from "./components/f-tcell/f-tcell";
export * from "./components/f-table-schema/f-table-schema";

export const flowTableElements = [FTable, FTrow, FTcell, FTableSchema];
