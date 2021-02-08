import { ICategoryModel } from './quiz.model';

export interface IMenuModel {
  name: string;
  subMenu?: Array<ICategoryModel>;
}