function Ready({ ingredients, getRecipe, isLoading, error }) {
  const minimumIngredients = 4;
  const ingredientsNeeded = minimumIngredients - ingredients.length;

  if (ingredientsNeeded > 0) {
    const collectedIngredients = Math.min(
      ingredients.length,
      minimumIngredients,
    );

    return (
      <div className="ingredient-progress">
        <div className="ingredient-progress__dots" aria-hidden="true">
          {Array.from({ length: minimumIngredients }, (_, index) => (
            <span
              key={index}
              className={`ingredient-progress__dot${
                index < collectedIngredients
                  ? " ingredient-progress__dot--filled"
                  : ""
              }`}
            />
          ))}
        </div>

        <p>
          Add {ingredientsNeeded} more{" "}
          {ingredientsNeeded === 1 ? "ingredient" : "ingredients"} to generate a
          recipe.
        </p>
      </div>
    );
  }
  return (
    <>
      <section className="get-recipe-container">
        <div>
          <h2 className="get-recipe-container__header">Ready for a recipe?</h2>
          <p>Generate a recipe from your list of ingredients.</p>
          <p id="ai-disclosure" className="ai-disclosure">
            Recipe generation uses Puter. You may be asked to sign in. Your
            ingredients, exclusions, and dietary preferences will be sent to
            Puter and its AI provider.
          </p>
        </div>
        <button
          type="button"
          onClick={getRecipe}
          className="get-recipe-container__button"
          disabled={isLoading}
          aria-describedby="ai-disclosure"
        >
          {isLoading ? "Generating…" : "Get a recipe"}
        </button>
      </section>

      <p
        className="recipe-status recipe-status--loading"
        role="status"
        aria-atomic="true"
      >
        {isLoading
          ? "Generating your recipe… The robot is doing its best."
          : ""}
      </p>

      {error && (
        <p className="recipe-status recipe-status--error" role="alert">
          {error}
        </p>
      )}
    </>
  );
}

export default Ready;
