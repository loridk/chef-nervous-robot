function AddIngredient({
  ingredients,
  setIngredients,
  resetRecipe,
  setStatusMessage,
}) {
  function addNewIngredient(formData) {
    const ingredientValue = formData.get("ingredient");

    if (typeof ingredientValue !== "string") {
      return;
    }

    const newIngredient = ingredientValue.trim();

    if (!newIngredient) {
      return;
    }

    const duplicateIngredient = ingredients.some(
      (ingredient) => ingredient.toLowerCase() === newIngredient.toLowerCase(),
    );

    if (duplicateIngredient) {
      setStatusMessage(`${newIngredient} is already in your ingredient list.`);
      return;
    }

    setIngredients((prevIngredients) => [...prevIngredients, newIngredient]);

    resetRecipe();
    setStatusMessage(`${newIngredient} added.`);
  }

  return (
    <form action={addNewIngredient} className="add-ingredient-form">
      <label htmlFor="ingredient" className="visually-hidden">
        Ingredient
      </label>

      <input
        id="ingredient"
        name="ingredient"
        type="text"
        placeholder="e.g. oregano"
        required
        maxLength={60}
      />
      <button type="submit">Add Ingredient</button>
    </form>
  );
}

export default AddIngredient;
