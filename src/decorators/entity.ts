import { isNil } from '../ultis';

export default function Entity() {
  const getPrivateName = (name: string) => `__HIDDEN__${name}`;
  const PRIMITIVE = [Number, String, Boolean];
  const constructData = (type: any, value: any) => (PRIMITIVE.includes(type) ? type(value) : new type(value));
  return function (constructorFunction: { new (...args: any[]): any }): any {
    return class extends constructorFunction {
      constructor(model: any, ...args: any) {
        super(model, ...args);
        const context = this as any;
        const data = (context['__data__'] = {} as any);
        const metaData = (context['__meta__'] = [] as any[]);
        metaData.map((meta: any) => {
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
        Object.assign(context, model);
      }
    };
  };
}
