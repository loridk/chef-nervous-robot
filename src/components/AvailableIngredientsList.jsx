function AvailableIngredientsList({
  ingredients,
  setIngredients,
  resetRecipe,
  setStatusMessage,
}) {
  const listItems = ingredients.map((ingredient) => (
    <li key={ingredient} className="ingredient-flex">
      <div className="ingredient-name">{ingredient}</div>
      <button
        type="button"
        onClick={() => removeIngredient(ingredient)}
        className="remove-ingredient"
        aria-label={`Remove ${ingredient}`}
        title={`Remove ${ingredient}`}
      ></button>
    </li>
  ));

  function removeIngredient(ingredientToRemove) {
    const confirmed = window.confirm(
      `Are you sure you want to remove "${ingredientToRemove}"?`,
    );

    if (!confirmed) {
      return;
    }

    setIngredients((currentIngredients) =>
      currentIngredients.filter(
        (ingredient) => ingredient !== ingredientToRemove,
      ),
    );

    resetRecipe();
    setStatusMessage(`${ingredientToRemove} removed.`);
  }

  return (
    <section>
      <h2>Ingredients on hand:</h2>
      <ul className="ingredients-list">{listItems}</ul>
    </section>
  );
}

export default AvailableIngredientsList;
