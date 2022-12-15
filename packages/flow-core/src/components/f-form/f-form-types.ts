export type FormBuilder = {
  gap?: "small" | "medium" | "large";
  variant?: "fill" | "transparent";
  separator?: boolean; // this will draw a line above each group - default
  label: {
    title: string;
    description?: string;
    icon?: string; //icon name from icon library
    iconTooltip?: string; // some more info to show on hover of icon or text
  };
  // we can specify multiple groups, groups can also nest
  group: [
    {
      direction?: "vertical" | "horizontal";
      variant?: "normal" | "compact";
      isCollapsible?: boolean; // coverts this group as accordion , if true then label is mandatory
      isCollapsed?: boolean;
      canDuplicate?: boolean; // this will add + icon button to duplicate group
      state?: "default" | "success" | "error" | "warning";

      label?: {
        title: string;
        description?: string;
        icon?: string; //icon name from icon library
        iconTooltip?: string; // some more info to show on hover of icon or text
      };
      // we can specify multiple fields
      fields: [
        {
          type:
            | "text"
            | "checkbox"
            | "radio"
            | "email"
            | "date"
            | "datetime"
            | "select"
            | "file"
            | "number";
          id?: string; // not mandatory but used to uniquely select any field from DOM
          state?: "default" | "success" | "error" | "warning";
          className?: string; // css class names for more customization
          dataQA?: string; // for qa automation testing
          value?: string | unknown[];
          name?: string | unknown[];
          defaultValue?: string | unknown[];
          canDuplicate?: boolean; // this will add + icon button to duplicate input
          autoComplete?: boolean; // to ebnable or disable browser's autocomplete native behavior
          // options are available for select, checkbox, radio
          options?: [
            {
              id?: string; // not mandatory but used to uniquely select any field from DOM
              state?: "default" | "success" | "error" | "warning";
              icon?: string; // icon name form icon library
              label: string;
              value: string | boolean | number;
              tooltip?: string;
            }
          ];
          label?: {
            title: string;
            icon?: string; //icon name from icon library
            iconTooltip?: string; // some more info to show on hover of icon or text
          };
          helperText?: string; // This will show at bottom and be replaced if validated
          placeholder?: string; // This will show as placeholder

          validationRules: [
            // we can specify multiple rules
            {
              name:
                | "required"
                | "max-length"
                | "email"
                | "url"
                | "range"
                | "customRegex"
                | "customFunction";
              when?: [];
              message?: string; // template type syntax can be used `${name} is required` , `${value} is not an url`;
              validate?: (value: string | unknown[]) => boolean; // if custom is selected then this property is mandatory
            }
          ];
        }
      ];
    }
  ];
};

export type TempFormBuilder = {
  gap?: "small" | "medium" | "large";
  variant?: "fill" | "transparent";
  separator?: boolean; // this will draw a line above each group - default
  label: {
    title: string;
    description?: string;
    icon?: string; //icon name from icon library
    iconTooltip?: string; // some more info to show on hover of icon or text
  };
  // we can specify multiple groups, groups can also nest
  group: [
    {
      direction?: "vertical" | "horizontal";
      variant?: "normal" | "compact";
      isCollapsible?: boolean; // coverts this group as accordion , if true then label is mandatory
      isCollapsed?: boolean;
      canDuplicate?: boolean; // this will add + icon button to duplicate group
      state?: "default" | "success" | "error" | "warning";

      label?: {
        title: string;
        description?: string;
        icon?: string; //icon name from icon library
        iconTooltip?: string; // some more info to show on hover of icon or text
      };
      // we can specify multiple fields
      fields: [
        {
          type:
            | "text"
            | "checkbox"
            | "radio"
            | "email"
            | "date"
            | "datetime"
            | "select"
            | "file"
            | "number";
          id?: string; // not mandatory but used to uniquely select any field from DOM
          state?: "default" | "success" | "error" | "warning";
          className?: string; // css class names for more customization
          dataQA?: string; // for qa automation testing
          value?: string | unknown[];
          name?: string | unknown[];
          defaultValue?: string | unknown[];
          canDuplicate?: boolean; // this will add + icon button to duplicate input
          autoComplete?: boolean; // to ebnable or disable browser's autocomplete native behavior
          // options are available for select, checkbox, radio
          errorPresent?: boolean;
          options?: [
            {
              id?: string; // not mandatory but used to uniquely select any field from DOM
              state?: "default" | "success" | "error" | "warning";
              icon?: string; // icon name form icon library
              label: string;
              value: string | boolean | number;
              tooltip?: string;
            }
          ];
          label?: {
            title: string;
            icon?: string; //icon name from icon library
            iconTooltip?: string; // some more info to show on hover of icon or text
          };
          helperText?: string; // This will show at bottom and be replaced if validated
          placeholder?: string; // This will show as placeholder

          validationRules: [
            // we can specify multiple rules
            {
              name:
                | "required"
                | "max-length"
                | "email"
                | "url"
                | "range"
                | "customRegex"
                | "customFunction";
              when?: [];
              message?: string; // template type syntax can be used `${name} is required` , `${value} is not an url`;
              validate?: (value: string | unknown[]) => boolean; // if custom is selected then this property is mandatory
              errorPresent?: boolean;
            }
          ];
        }
      ];
    }
  ];
};
