import {BrickLinkClientService} from "./brickLinkClient.service";
import {Result} from "../models";
import {IBrickLinkSet, IBrickLinkSetPrice} from "../models/integration";

// TODO: add caching logic here
export class SetsIntegrationService {
  constructor(private readonly brickLinkClient: BrickLinkClientService) {}

  async getSetByCode(code: string): Promise<Result<IBrickLinkSet>> {
    return await this.brickLinkClient.getSetByCode(code);
  }

  async getSetPricesByCode(code: string): Promise<Result<IBrickLinkSetPrice>> {
    return await this.brickLinkClient.getSetPricesByCode(code);
  }
}