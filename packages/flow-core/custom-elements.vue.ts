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

                    state?: 'primary' | 'neutral' | 'success' | 'warning' | 'danger' | undefined;

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

        'f-counter': VueConstructor<
            {
                $props: {
                    label: string;

                    size?: 'large' | 'medium' | 'small' | undefined;

                    state?: 'primary' | 'success' | 'warning' | 'danger' | 'neutral' | undefined;

                    loading?: boolean | undefined;

                    disabled?: boolean | undefined;
                };
            } & Vue
        >;

        'f-div': VueConstructor<
            {
                $props: {
                    variant?: 'row' | 'column' | undefined;
                };
            } & Vue
        >;

        'f-icon': VueConstructor<
            {
                $props: {
                    size?: 'x-large' | 'large' | 'medium' | 'small' | 'x-small' | undefined;

                    state?:
                        | 'default'
                        | 'secondary'
                        | 'subtle'
                        | 'primary'
                        | 'success'
                        | 'danger'
                        | 'warning'
                        | 'neutral'
                        | undefined;

                    source: string;

                    disabled?: boolean | undefined;

                    loading?: boolean | undefined;

                    clickable?: boolean | undefined;
                };
            } & Vue
        >;

        undefined: VueConstructor<
            {
                $props: {};
            } & Vue
        >;
    }
}
