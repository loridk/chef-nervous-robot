function ExcludeIngredient({
  exIngredients,
  setExIngredients,
  resetRecipe,
  setStatusMessage,
}) {
  function excludeIngredient(formData) {
    const exIngredientValue = formData.get("exIngredient");

    if (typeof exIngredientValue !== "string") {
      return;
    }

    const exIngredient = exIngredientValue.trim();

    if (!exIngredient) {
      return;
    }

    const duplicateIngredient = exIngredients.some(
      (currentExIngredient) =>
        currentExIngredient.toLowerCase() === exIngredient.toLowerCase(),
    );

    if (duplicateIngredient) {
      setStatusMessage(
        `${exIngredient} is already in your excluded ingredient list.`,
      );
      return;
    }

    setExIngredients((prevExIngredients) => [
      ...prevExIngredients,
      exIngredient,
    ]);

    resetRecipe();
    setStatusMessage(`${exIngredient} added to excluded ingredients.`);
  }

  return (
    <form action={excludeIngredient} className="exclude-ingredient-form">
      <label htmlFor="exIngredient" className="visually-hidden">
        Ingredient to Exclude
      </label>

      <input
        id="exIngredient"
        name="exIngredient"
        type="text"
        placeholder="e.g. olives"
        required
        maxLength={60}
      />

      <button type="submit">Exclude Ingredient</button>
    </form>
  );
}

export default ExcludeIngredient;
