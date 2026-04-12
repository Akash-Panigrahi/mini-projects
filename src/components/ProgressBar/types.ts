export type ProgressBarProps =
  | {
      variant: "indeterminate";
    }
  | {
      variant: "determinate";
      value: number;
      buffer?: number;
    };
