/* eslint-disable */
import { VueConstructor } from 'vue';
import {
    FComplexPriorityProp,
    FComplexAssignee,
    FComplexLanguageProp,
} from './src/f-complex/f-complex';
declare module 'vue' {
    export interface GlobalComponents {
        'f-complex': VueConstructor<
            {
                $props: {
                    type: 'high' | 'low' | 'medium';

                    priority?: FComplexPriorityProp | undefined;

                    assignee?: null | FComplexAssignee | undefined;

                    language?: FComplexLanguageProp | undefined;

                    active?: boolean | undefined;
                };
            } & Vue
        >;
    }
}
