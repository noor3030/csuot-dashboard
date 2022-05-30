export type SelectItem = {
    name: string;
    id: string;
  };
 export type TreeItem = {
    id: string;
    name: string;
    children?: Array<TreeItem>;
  };