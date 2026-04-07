export type Field =
  | {
      type: "text";
      name: string;
      label: string;
      defaultValue?: string;
      validate?: (value: string) => string;
      showIf?: (values: Record<string, unknown>) => boolean;
    }
  | {
      type: "select";
      name: string;
      label: string;
      options: { label: string; value: string }[];
    };
