import { IBrickLinkSettings } from "../settings";
import {generateOAuthHeader} from "../utils/authUtils";
import {IIntegrationSet, IIntegrationSetPrice, IIntegrationSetCategory} from "../models/integration";
import {failure, Result, success} from "../models";

export class BrickLinkClientService {
  constructor(private readonly settings: IBrickLinkSettings) {}

  async getSetByCode(setCode: string): Promise<Result<IIntegrationSet>> {
    return this.executeRequest<IIntegrationSet>('GET', `/items/set/${setCode}`);
  }

  async getSetPricesByCode(setCode: string): Promise<Result<IIntegrationSetPrice>> {
    return this.executeRequest<IIntegrationSetPrice>('GET', `/items/set/${setCode}/price`);
  }

  async getCategories(): Promise<Result<IIntegrationSetCategory>> {
    return this.executeRequest<IIntegrationSetPrice>('GET', `/categories`);
  }

  private async executeRequest<T>(method: string, relativeUrl: string): Promise<Result<T>> {
    const url = `${this.settings.apiUrl}${relativeUrl}`;
    const response = await fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': generateOAuthHeader(
          method,
          url,
          this.settings.consumerKey,
          this.settings.consumerSecret,
          this.settings.token,
          this.settings.tokenSecret
        ),
      }
    });

    if (response.status === 200) {
      const { data } = await response.json() as { data: T };
      return success(data);
    } else if (response.status === 404) {
      return success(null);
    } else {
      const { meta } = await response.json();
      return failure(meta.message);
    }
  }
}
