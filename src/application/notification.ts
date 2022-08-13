export interface Notification {
  message: string;
  level: "error" | "warning";
}

export class NotificationHandler {
  private readonly notifications: Notification[] = [];

  public add(props: Notification): void {
    this.notifications.push(props);
  }

  public clear(): void {
    this.notifications.pop();
  }

  public getErrors(): void {
    this.notifications.filter((notification) => notification.level === "error");
  }

  public getErrorMessages(): string {
    return this.notifications
      .map((notification) => notification.message)
      .join(", ");
  }
}
