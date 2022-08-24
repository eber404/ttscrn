export class InfraError extends Error {
  public constructor(props: InfraError) {
    super(`[${props.stack}] ${props.name}: ${props.message}`);
  }
}
