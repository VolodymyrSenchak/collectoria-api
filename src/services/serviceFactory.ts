import {AuthService} from "./auth.service";
import { CollectionsService } from "./collections.service";
import {BrickLinkClientService} from "./brickLinkClient.service";
import {ENV_VARIABLES} from "../utils/envVariables";
import {SetsIntegrationService} from "./setsIntegration.service";

class ServiceFactory {
  private readonly container = new Map<Function, () => object>();

  constructor() {
    this.container.set(AuthService, () => new AuthService());
    this.container.set(CollectionsService, () => new CollectionsService());
    this.container.set(BrickLinkClientService, () => new BrickLinkClientService(ENV_VARIABLES.brickLink));
    this.container.set(SetsIntegrationService, () => new SetsIntegrationService(this.getService(BrickLinkClientService)));
  }

  getService<T>(service: new (...args: any[]) => T): T {
    const serviceFactory = this.container.get(service);
    if (!serviceFactory) {
      throw new Error(`Service ${service.name} is not registered in the container.`);
    }
    return serviceFactory() as T;
  }
}

export default new ServiceFactory();