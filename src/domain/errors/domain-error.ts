export class DomainError extends Error {
  public constructor(props: DomainError) {
    super(`[${props.stack}] ${props.name}: ${props.message}`);
  }
}
