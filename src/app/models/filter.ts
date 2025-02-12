export interface FilterConfig {
  offset: number;
  where?: {
    and?: Array<any>,
    or?: Array<any>,
    [key: string]: any
  };
  order?: string[];
  fields?: Object;
  include?: Object;
}
