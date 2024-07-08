import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {ApiMeals, Meal} from '../../../types';
import axiosApi from '../../axiosApi';
import Spinner from '../../components/Spinner/Spinner';

const Home: React.FC = () => {

  const [meals, setMeals] = useState<Meal[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchMeals = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await axiosApi.get<ApiMeals | null>('/meals.json');
      const apiMeals = response.data;

      if (apiMeals) {
        setMeals(Object.keys(apiMeals).map(id => ({
          ...apiMeals[id],
            id
        })));
      } else {
        setMeals([]);
      }

    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchMeals();
  }, [fetchMeals]);

  const totalCalories = useMemo(() => meals.reduce((acc, meal) =>{
    return acc + meal.calories;
  }, 0), [meals]);

  return (
    <div className="mt-2 container-fluid">
      <h1>Total Calories : {totalCalories}</h1>
      {isLoading ? (
        <Spinner/>
      ) : meals.map((meal) => (
        <div key={meal.id} className="card mt-3">
          <div className="card-body">

            <p>{meal.time}</p>
            <p>{meal.description} ({meal.calories} Kcal)</p>
            <div className="d-flex gap-2">
              <p>
                <button className="btn btn-primary">Edit</button>
              </p>
              <p>
                <button className="btn btn-danger">Delete</button>
              </p>
            </div>

          </div>
        </div>
      ))
      }
    </div>
  );
};

export default Home;