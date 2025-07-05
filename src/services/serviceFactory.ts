import {AuthService} from "./auth.service";
import { CollectionsService } from "./collections.service";

class ServiceFactory {
  private readonly container = new Map<Function, () => object>();

  constructor() {
    this.container.set(AuthService, () => new AuthService());
    this.container.set(CollectionsService, () => new CollectionsService());
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