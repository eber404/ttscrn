import { FoundScreenshotEvent } from "@/domain/events/found-screenshot";
import { EventHandler } from "@/domain/events/types/event-handler";
import { EventName } from "@/domain/events/types/event-name";
import { SendEmailService } from "@/domain/services/send-email/send-email-service";
import { SendEmailServiceDTO } from "@/domain/services/send-email/send-email-service-dto";

export class SendScreenshotHandler implements EventHandler {
  public readonly eventName: EventName = "FOUND_SCREENSHOT";

  public constructor(private readonly sendEmailService: SendEmailService) {}

  public async handle(event: FoundScreenshotEvent): Promise<void> {
    const email: SendEmailServiceDTO = {
      to: event.email,
      subject: "New tweet screenshot arrived 📸🐦",
      body: `
       Hello dear,
       <br />
       <br />
       Heres your screenshot link: <a href=${event.screenshot.image}>${event.screenshot.image}</a>
       <br />
       See you around 👋!
      `,
    };

    await this.sendEmailService.send(email);
  }
}
