export type BaseInputProps = {
  readonly?: boolean;
  modelValue?: string | number;
  placeholder?: string;
};

export type BaseInputEmit = {
  "update:modelValue": [string | number];
  wrapperClicked: [];
};
