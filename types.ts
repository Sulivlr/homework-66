export interface ApiMeal {
  description: string;
  time: string;
  calories: number;
}

export interface ApiMeals {
  [id: string]: ApiMeal
}

export interface Meal extends ApiMeal {
  id: string;
}