export interface Command<T> {
  execute(props?: T): Promise<void>;
}

export interface Query<T, U> {
  execute(props?: T): Promise<U>;
}
