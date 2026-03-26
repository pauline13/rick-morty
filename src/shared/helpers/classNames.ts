type ClassValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | ClassValue[]
  | { [key: string]: boolean | undefined | null };

export function classNames(...args: ClassValue[]) {
  const classes: string[] = [];

  const collectClasses = (arg: ClassValue) => {
    if (typeof arg === 'string' || typeof arg === 'number') {
      classes.push(arg.toString());
    } else if (Array.isArray(arg)) {
      arg.forEach(collectClasses);
    } else if (arg !== null && typeof arg === 'object') {
      Object.keys(arg).forEach((key) => {
        if (arg[key]) {
          classes.push(key);
        }
      });
    }
  };

  args.forEach((arg) => {
    if (arg) {
      collectClasses(arg);
    }
  });

  return classes.join(' ');
}
