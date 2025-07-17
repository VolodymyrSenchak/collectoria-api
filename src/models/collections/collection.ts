export interface CollectionBase {
  name: string;
  description?: string;
}

export interface SaveCollectionRequest extends CollectionBase {
  userId: string;
}

export interface CollectionResponse extends CollectionBase {
  id: string;
}

export interface CollectionSet {
  collectionId: string;
  userId: string;
  payload: string;
  id?: string;
}

