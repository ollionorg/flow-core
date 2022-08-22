/* eslint-disable */
import { VueConstructor } from 'vue';
import type { FDivBorderProp, FDivPaddingProp, FDivWidthProp, FDivHeightProp } from './src';
import type { FIconButtonVariant, FIconButtonType, FIconButtonSize, FIconButtonState } from './src';
declare module 'vue' {
    export interface GlobalComponents {
        'f-button': VueConstructor<
            {
                $props: {
                    label: string;

                    category?: 'fill' | 'outline' | 'transparent' | undefined;

                    size?: 'large' | 'medium' | 'small' | 'x-small' | undefined;

                    state?: 'primary' | 'neutral' | 'success' | 'warning' | 'danger' | undefined;

                    variant?: 'round' | 'curved' | 'block' | undefined;

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
                    variant?: 'block' | 'curved' | undefined;

                    direction?: 'row' | 'column' | undefined;

                    state?:
                        | 'subtle'
                        | 'default'
                        | 'secondary'
                        | 'tertiary'
                        | 'success'
                        | 'warning'
                        | 'danger'
                        | 'primary'
                        | undefined;

                    border?: FDivBorderProp | undefined;

                    gap?:
                        | 'auto'
                        | 'x-large'
                        | 'large'
                        | 'medium'
                        | 'small'
                        | 'x-small'
                        | 'none'
                        | undefined;

                    padding?: FDivPaddingProp | undefined;

                    align?:
                        | 'top-left'
                        | 'top-center'
                        | 'top-right'
                        | 'middle-left'
                        | 'middle-center'
                        | 'middle-right'
                        | 'bottom-left'
                        | 'bottom-center'
                        | 'bottom-right'
                        | undefined;

                    width?: FDivWidthProp | undefined;

                    height?: FDivHeightProp | undefined;

                    disabled?: boolean | undefined;

                    loading?: 'skeleton' | 'loader' | undefined;

                    clickable?: boolean | undefined;

                    overflow?: 'wrap' | 'scroll' | 'hidden' | undefined;

                    selected?:
                        | 'none'
                        | 'background'
                        | 'border'
                        | 'notch-right'
                        | 'notch-left'
                        | undefined;

                    sticky?: 'none' | 'top' | 'bottom' | 'left' | 'right' | undefined;
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

        'f-icon-button': VueConstructor<
            {
                $props: {
                    icon?: string;

                    variant?: FIconButtonVariant | undefined;

                    type?: FIconButtonType | undefined;

                    size?: FIconButtonSize | undefined;

                    state?: FIconButtonState | undefined;

                    counter?: string | undefined;

                    loading?: boolean | undefined;

                    disabled?: boolean | undefined;
                };
            } & Vue
        >;

        'f-text': VueConstructor<
            {
                $props: {
                    variant?: 'heading' | 'para' | 'code' | undefined;

                    size?: 'x-large' | 'large' | 'medium' | 'small' | 'x-small' | undefined;

                    weight?: 'bold' | 'medium' | 'regular' | undefined;

                    state?:
                        | 'default'
                        | 'secondary'
                        | 'subtle'
                        | 'primary'
                        | 'success'
                        | 'danger'
                        | 'warning'
                        | undefined;

                    align?: 'left' | 'center' | 'right' | undefined;

                    loading?: boolean | undefined;

                    disabled?: boolean | undefined;

                    ellipsis?: boolean | undefined;
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
