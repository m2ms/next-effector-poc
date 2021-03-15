export interface Field {
  name: string;
  value: string | number | null;
}

export interface GeneratedItem {
  id: number;
  fields: Field[];
}

export interface FieldMeta {
  name: string;
  nickname: string;
  enabled: boolean;
}

export interface ResponseDataFile {
  data: number;
  message: string;
}
