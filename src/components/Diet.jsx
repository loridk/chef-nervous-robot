function Diet({ diet, setDiet, resetRecipe }) {
  function handleDietChange(event) {
    const value = event.target.value;
    const checked = event.target.checked;

    setDiet((prevDiet) =>
      checked
        ? [...prevDiet, value]
        : prevDiet.filter((item) => item !== value),
    );
    resetRecipe();
  }

  return (
    <fieldset className="dietary-restrictions">
      <legend>Dietary restrictions:</legend>
      <label>
        <input
          type="checkbox"
          name="dietaryRestrictions"
          value="vegetarian"
          checked={diet.includes("vegetarian")}
          onChange={handleDietChange}
        />
        Vegetarian
      </label>
      <label>
        <input
          type="checkbox"
          name="dietaryRestrictions"
          value="vegan"
          checked={diet.includes("vegan")}
          onChange={handleDietChange}
        />
        Vegan
      </label>
      <label>
        <input
          type="checkbox"
          name="dietaryRestrictions"
          value="gluten-free"
          checked={diet.includes("gluten-free")}
          onChange={handleDietChange}
        />
        Gluten-Free
      </label>
    </fieldset>
  );
}

export default Diet;
