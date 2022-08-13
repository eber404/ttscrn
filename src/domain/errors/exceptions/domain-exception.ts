export class DomainException extends Error {
  public constructor(props: DomainException) {
    super(`[${props.stack}] ${props.name}: ${props.message}`);
    Object.assign(this, props);
  }
}
