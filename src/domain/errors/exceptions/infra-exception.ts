export class InfraException extends Error {
  public constructor(props: InfraException) {
    super(`[${props.stack}] ${props.name}: ${props.message}`);
    Object.assign(this, props);
  }
}
