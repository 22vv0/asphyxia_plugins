export interface Param {
  collection: 'param';
  
  type: number;
  id: number;
  param: number[];
}

export interface Serial {
  collection: 'serial';
  version: number;
  list: number[];
}