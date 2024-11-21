export interface RuleConfig {
  [key: string]: {
    fn: () => boolean;
    errorMessage: string;
  };
}
