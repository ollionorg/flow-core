/* eslint-disable */
import { VueConstructor } from 'vue';

declare module 'vue' {
    export interface GlobalComponents {
        'f-button': VueConstructor<
            {
                $props: {
                    label: string;

                    variant?: 'fill' | 'outline' | 'transparent' | undefined;

                    size?: 'large' | 'medium' | 'small' | 'x-small' | undefined;

                    state?: 'primary' | 'subtle' | 'success' | 'warning' | 'danger' | undefined;

                    shape?: 'round' | 'curved' | 'block' | undefined;

                    iconLeft?: string | undefined;

                    iconRight?: string | undefined;

                    counter?: string | undefined;

                    loading?: boolean | undefined;

                    disabled?: boolean | undefined;

                    labelWrap?: boolean | undefined;
                };
            } & Vue
        >;

        undefined: VueConstructor<
            {
                $props: {};
            } & Vue
        >;

        'f-counter': VueConstructor<
            {
                $props: {
                    label?: string;

                    size?: 'large' | 'medium' | 'small' | undefined;

                    state?:
                        | 'primary'
                        | 'subtle'
                        | 'success'
                        | 'warning'
                        | 'danger'
                        | 'neutral'
                        | undefined;

                    loading?: boolean | undefined;

                    disabled?: boolean | undefined;
                };
            } & Vue
        >;

        'f-icon': VueConstructor<
            {
                $props: {
                    source: string;
                };
            } & Vue
        >;
    }
}
