import {getSupabaseClient} from "../utils/supabaseDb";
import {fromDbResult, Result} from "../models";
import { CollectionResponse, SaveCollectionRequest, CollectionSet } from "../models/collections";

export class CollectionsService {
  private readonly db = getSupabaseClient();

  private readonly collectionsTable = 'collections';
  private readonly collectionSetsTable = 'collectionSets';

  async getCollections(userId: string): Promise<Result<CollectionResponse[]>> {
    const { data, error } = await this.db
      .from(this.collectionsTable)
      .select()
      .eq('userId', userId);

    return fromDbResult<CollectionResponse[]>(data, error);
  }

  async getCollection(collectionId: string, userId: string): Promise<Result<CollectionResponse>> {
    const { data, error } = await this.db
      .from(this.collectionsTable)
      .select()
      .eq('userId', userId).eq('id', collectionId);

    return fromDbResult<CollectionResponse>(data[0], error);
  }

  async getCollectionSets(collectionId: string, userId: string): Promise<Result<CollectionSet[]>> {
    const { data, error } = await this.db
      .from(this.collectionSetsTable)
      .select()
      .eq('userId', userId).eq('collectionId', collectionId);

    return fromDbResult<CollectionSet[]>(data, error);
  }

  async saveCollectionSet(collectionSet: CollectionSet): Promise<Result<string>> {
    const { error, data: [newSet] } = await this.db
      .from(this.collectionSetsTable)
      .upsert(collectionSet)
      .select();
    return fromDbResult((newSet as CollectionSet).id, error);
  }

  async removeCollectionSet(userId: string, collectionId: string, collectionSetId: string): Promise<Result<boolean>> {
    const { error } = await this.db
      .from(this.collectionSetsTable)
      .delete()
      .eq('userId', userId)
      .eq('collectionId', collectionId)
      .eq('id', collectionSetId);

    return fromDbResult(true, error);
  }

  async saveCollection(collection: SaveCollectionRequest): Promise<Result<string>> {
    const { error, data: [newCollection] } = await this.db
      .from(this.collectionsTable)
      .upsert<SaveCollectionRequest>(collection)
      .select();
    return fromDbResult((newCollection as CollectionResponse).id, error);
  }

  async removeCollection(userId: string, collectionId: string): Promise<Result<boolean>> {
    const { error } = await this.db
      .from(this.collectionsTable)
      .delete()
      .eq('userId', userId)
      .eq('id', collectionId);

    return fromDbResult(true, error);
  }
}