import React, {useCallback, useEffect, useState} from 'react';
import axiosApi from '../../axiosApi';
import {useNavigate, useParams} from 'react-router-dom';
import {ApiMeal} from '../../../types';
import Spinner from '../../components/Spinner/Spinner';

const MutationMeal = () => {
  const [meal, setMeal] = useState({
    time: '',
    calories: '',
    description: '',
  });
  const [loading, setIsLoading] = useState(false);
  const {id} = useParams();
  const navigate = useNavigate();

  const changeMeal = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const {name, value} = event.target;
    setMeal(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const fetchMeal = useCallback(async (id: string) => {
    try {
      setIsLoading(true);
      const response = await axiosApi.get<ApiMeal | null>(`/meals/${id}.json`);
      const meal = response.data;

      if (meal) {
        setMeal({
          ...meal,
          calories: meal.calories.toString(),
        });
      }

    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (id) {
      void fetchMeal(id);
    }
  }, [fetchMeal, id]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const apiMeal = {
        ...meal,
        calories: Number(meal.calories),
      };

      if (id) {
        await axiosApi.put(`/meals/${id}.json`, apiMeal);
        navigate('/');
      } else {
        await axiosApi.post('/meals.json', apiMeal);
        navigate('/');
      }

    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h4>{id ? 'Edit' : 'Add new meal'}</h4>
      {loading ? <Spinner/> : (
        <form onSubmit={onSubmit}>
          <div className="form-group mt-3">
            <label htmlFor="time">Select Calories</label>
            <select
              name="time"
              id="time"
              className="form-select"
              value={meal.time}
              onChange={changeMeal}
              required
            >
              <option value="Breakfast">Breakfast</option>
              <option value="Snack">Snack</option>
              <option value="Lunch">Lunch</option>
              <option value="Dinner">Dinner</option>
            </select>
            <div className="form-group mt-2">
              <label htmlFor="time">Meal description</label>
              <input
                type="text"
                name="description"
                id="description"
                required
                className="form-control"
                value={meal.description}
                onChange={changeMeal}
              />
            </div>

            <div className="form-group mt-2">
              <label htmlFor="calories">Calories</label>
              <input
                type="number"
                name="calories"
                id="calories"
                required
                className="form-control"
                value={meal.calories}
                onChange={changeMeal}
              />
            </div>
            <button type="submit" className="btn btn-primary mt-3">{id ? 'Edit' : 'Create'}</button>
          </div>
        </form>
      )
      }

    </div>


  );
};

export default MutationMeal;