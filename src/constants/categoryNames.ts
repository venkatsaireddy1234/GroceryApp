import { categories } from "../data/catalog";

export const categoryNames = new Map(categories.map((category) => [category.id, category.label]));
