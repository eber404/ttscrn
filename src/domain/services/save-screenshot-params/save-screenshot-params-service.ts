import { SaveScreenshotParamsServiceDTO } from "./save-screenshot-params-service-dto";

export interface SaveScreenshotParamsService {
  save: (props: SaveScreenshotParamsServiceDTO) => Promise<void>;
}
