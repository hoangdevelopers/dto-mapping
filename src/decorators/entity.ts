import { isNil } from '../ultis';
import { IMeta } from './meta';
import cloneDeep from 'lodash.clonedeep';
export function Entity() {
  const getPrivateName = (name: string) => `__HIDDEN__${name}`;
  const PRIMITIVE = [Number, String, Boolean];
  const constructData = (type: any, value: any) => (PRIMITIVE.includes(type) ? type(value) : new type(value));
  return function (constructorFunction: { new (...args: any[]): any }): any {
    return class extends constructorFunction {
      constructor(_model: any, ...args: any) {
        const model = cloneDeep(_model);
        super(model, ...args);
        const context = this as any;
        const data = (context['__data__'] = {} as any);
        const metaData = (context['__meta__'] || new Map<string, IMeta>()) as Map<string, IMeta>;
        Array.from(metaData.values())
          .filter((meta) => meta.transform)
          .map((meta: IMeta) => {
            const { propertyKey, transform } = meta;
            model[propertyKey] = transform?.fn(model, propertyKey);
          });
        Array.from(metaData.values())
          .filter((meta) => !!meta.type)
          .map((meta: IMeta) => {
            const { propertyKey, type } = meta;
            const descriptor = {
              set: function (value: any) {
                data[getPrivateName(propertyKey)] = isNil(value)
                  ? null
                  : Array.isArray(value)
                  ? value.map((v) => constructData(type, v))
                  : constructData(type, value);
              },
              get: function () {
                return data[getPrivateName(propertyKey)];
              },
            };
            Object.defineProperty(context, propertyKey, descriptor);
          });
        Object.defineProperties(this, {
          __data__: { writable: true, enumerable: false },
        });
        Object.defineProperties(this, {
          __meta__: { writable: true, enumerable: false },
        });
        Object.assign(context, model);
      }
    };
  };
}
