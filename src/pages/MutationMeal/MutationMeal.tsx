import React, {useState} from 'react';
import axiosApi from '../../axiosApi';

const MutationMeal = () => {
  const [meal, setMeal] = useState({
    time: '',
    calories: '',
    description: '',
  });
  const [loading, setIsLoading] = useState(false);

  const changeMeal = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const {name, value} = event.target;
    setMeal(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const apiMeal = {
        ...meal,
        calories: Number(meal.calories),
      };

      await axiosApi.post('/meals.json', apiMeal);

    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <h4 className="mt-4">Add / Edit</h4>
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
      </div>
      <button type="submit" className="btn btn-primary mt-3">Create</button>
    </form>

  );
};

export default MutationMeal;