import {BrickLinkClientService} from "./brickLinkClient.service";
import {Result} from "../models";
import {IIntegrationSet, IIntegrationSetPrice, IIntegrationSetCategory} from "../models/integration";

// TODO: add caching logic here
export class SetsIntegrationService {
  constructor(private readonly brickLinkClient: BrickLinkClientService) {}

  async getSetByCode(code: string): Promise<Result<IIntegrationSet>> {
    return await this.brickLinkClient.getSetByCode(code);
  }

  async getSetPricesByCode(code: string): Promise<Result<IIntegrationSetPrice>> {
    return await this.brickLinkClient.getSetPricesByCode(code);
  }

  async getCategories(): Promise<Result<IIntegrationSetCategory>> {
    return await this.brickLinkClient.getCategories();
  }
}