export function SafeType(opts: { type: any }) {
  return function (...args: any) {
    const [target, propertyKey, descriptor] = args;
    if (!target['__meta__']) target['__meta__'] = [];
    target['__meta__'].push({
      propertyKey,
      type: opts.type,
    });
  };
}
