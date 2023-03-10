export type singleElemType = { [key: string]: Element };
export type multiElemType = { [key: string]: Element[] };

type elemType = {
  single: singleElemType;
  multi: multiElemType;
};

export default elemType;
