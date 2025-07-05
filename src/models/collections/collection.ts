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

export interface CollectionSetBase {
  collectionId: string;
  name: string;
  description?: string;
}

export interface SaveCollectionSetRequest extends CollectionSetBase {
  userId: string;
}

export interface CollectionSetResponse extends CollectionSetBase {
  id: string;
}

