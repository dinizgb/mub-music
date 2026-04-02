export interface StoreType {
  id: string;
  title: string;
  url: string;
  storeInfo: StoreInfoType;
}

export interface StoreInfoType {
  logo: {
    sourceUrl: string;
  };
}
