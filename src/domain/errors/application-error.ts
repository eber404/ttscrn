export class ApplicationError extends Error {
  public constructor(props: ApplicationError) {
    super(`[${props.stack}] ${props.name}: ${props.message}`);
  }
}
