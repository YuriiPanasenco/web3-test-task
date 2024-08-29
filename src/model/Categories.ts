import {Exception} from "./Exception";

export interface Category {
    strCategory: string;
}

export interface CategoriesState {
    categories: Category[];
    loading: boolean;
    error: Exception | null;
}