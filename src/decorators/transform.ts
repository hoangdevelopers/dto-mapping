import { IMeta, ITransformMeta } from "./meta";

export function Transform(opts: ITransformMeta) {
    return function (...args: any) {
      const [target, propertyKey, descriptor] = args;
      if (!target['__meta__']) target['__meta__'] = new Map<string, IMeta>();
      const metaMap = target['__meta__'] as Map<string, IMeta>
      const meta = metaMap.get(propertyKey)
      metaMap.set(propertyKey, {
        propertyKey: propertyKey,
        ...(meta? meta : {}),
        transform: opts
      });
    };
  }
  