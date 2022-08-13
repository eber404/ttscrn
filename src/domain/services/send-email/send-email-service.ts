import { SendEmailServiceDTO } from "./send-email-service-dto";

export interface SendEmailService {
  send(props: SendEmailServiceDTO): Promise<void>;
}
