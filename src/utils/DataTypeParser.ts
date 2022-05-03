type Type =
  | 'string'
  | 'number'
  | 'bigint'
  | 'boolean'
  | 'symbol'
  | 'undefined'
  | 'object'
  | 'function';

const parseNumber = <T = number>(
  value: any | null,
  onInvalid?: (invalidParsed: any) => T
): T | number => {
  const invalidTypes: Type[] = [
    'boolean',
    'function',
    'object',
    'symbol',
    'undefined',
  ];
  const parsed = Number(value);

  if (
    onInvalid &&
    (value === null || invalidTypes.includes(typeof value) || isNaN(parsed))
  )
    return onInvalid(parsed);

  return parsed;
};

const parseString = <T = string>(
  value: any | null,
  onInvalid?: (invalidParsed: any) => T
): T | string => {
  const invalidTypes: Type[] = [
    'boolean',
    'function',
    'object',
    'symbol',
    'undefined',
  ];
  const parsed = String(value);

  if (onInvalid && (value === null || invalidTypes.includes(typeof value)))
    return onInvalid(parsed);

  return parsed?.trim();
};

export { parseNumber, parseString, Type };
