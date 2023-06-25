declare type Concrete<Type> = {
  [Property in keyof Type]-?: Type[Property];
};

declare type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>
