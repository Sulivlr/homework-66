import React, {useState} from 'react';

const MutationMeal = () => {
  const [meal, setMeal] = useState({
    time: '',
    calories: '',
    description: '',
  });

  const changeMeal = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const {name, value} = event.target;
    setMeal(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <form>
      <h4>Add / Edit</h4>
      <div className="form-group">
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
        <div className="form-group">
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

        <div className="form-group">
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