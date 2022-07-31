export interface ITransformMeta {
  fn: (model: any, field: string) => any;
}
export interface IMeta {
  propertyKey: string;
  type?: any;
  transform?: ITransformMeta;
}
