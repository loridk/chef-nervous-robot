function ExcludedIngredientsList({
  exIngredients,
  setExIngredients,
  resetRecipe,
  setStatusMessage,
}) {
  const exListItems = exIngredients.map((exIngredient) => (
    <li key={exIngredient} className="ingredient-flex">
      <div className="ingredient-name">{exIngredient}</div>
      <button
        type="button"
        onClick={() => removeExIngredient(exIngredient)}
        className="remove-ingredient"
        aria-label={`Remove ${exIngredient}`}
        title={`Remove ${exIngredient}`}
      ></button>
    </li>
  ));

  function removeExIngredient(ingredientToRemove) {
    const confirmed = window.confirm(
      `Are you sure you want to remove "${ingredientToRemove}"?`,
    );

    if (!confirmed) {
      return;
    }

    setExIngredients((currentExIngredients) =>
      currentExIngredients.filter(
        (exIngredient) => exIngredient !== ingredientToRemove,
      ),
    );

    resetRecipe();
    setStatusMessage(
      `${ingredientToRemove} removed from excluded ingredients.`,
    );
  }

  return (
    <section>
      <h3>Excluded ingredients:</h3>
      <ul className="ingredients-list">{exListItems}</ul>
    </section>
  );
}

export default ExcludedIngredientsList;
