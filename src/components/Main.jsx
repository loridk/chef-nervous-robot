import { useState } from "react";
import AddIngredient from "./forms/AddIngredient";
import ExcludeIngredient from "./forms/ExcludeIngredient";
import AvailableIngredientsList from "./AvailableIngredientsList";
import ExcludedIngredientsList from "./ExcludedIngredientsList";
import Diet from "./Diet";
import Ready from "./Ready";
import Recipe from "./Recipe";
import { getRecipeAI } from "../AI";

function getRecipeErrorMessage(error) {
  const errorCode =
    typeof error === "object" && error !== null
      ? String(error.error ?? error.code ?? "")
      : "";

  const errorMessage =
    error instanceof Error
      ? error.message
      : typeof error === "object" && error !== null
        ? String(error.msg ?? error.message ?? "")
        : String(error ?? "");

  const errorDetails = `${errorCode} ${errorMessage}`.toLowerCase();

  if (errorDetails.includes("auth_window_closed")) {
    return "Recipe generation was cancelled because Puter sign-in wasn't completed.";
  }

  if (errorDetails.includes("popup_blocked")) {
    return "Your browser blocked the Puter sign-in window. Allow pop-ups for this site and try again.";
  }

  if (
    errorDetails.includes("usage-limited") ||
    errorDetails.includes("usage limit") ||
    errorDetails.includes("insufficient_funds") ||
    errorDetails.includes("insufficient funds") ||
    errorDetails.includes("quota")
  ) {
    return "Your Puter AI allowance isn't currently available. Please try again later or check your Puter account.";
  }

  if (
    errorDetails.includes("network") ||
    errorDetails.includes("fetch") ||
    errorDetails.includes("offline")
  ) {
    return "Chef Nervous Robot couldn't reach the recipe service. Check your connection and try again.";
  }

  return "Chef Nervous Robot couldn't generate a recipe. Please try again.";
}

function Main() {
  const [ingredients, setIngredients] = useState([]);
  const [showExclusions, setShowExclusions] = useState(false);
  const [exIngredients, setExIngredients] = useState([]);
  const [statusMessage, setStatusMessage] = useState("");
  const [diet, setDiet] = useState([]);
  const [recipe, setRecipe] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  function resetRecipe() {
    setRecipe("");
    setError("");
  }

  function handleExclusionsChange(event) {
    const isChecked = event.target.checked;
    setShowExclusions(isChecked);

    if (!isChecked) {
      if (exIngredients.length > 0) {
        setStatusMessage("All excluded ingredients cleared.");
      }

      setExIngredients([]);
      resetRecipe();
    }
  }

  async function getRecipe() {
    if (isLoading) return;

    setIsLoading(true);
    setError("");

    try {
      const recipeMarkdown = await getRecipeAI(
        ingredients,
        diet,
        exIngredients,
      );

      if (typeof recipeMarkdown !== "string" || !recipeMarkdown.trim()) {
        throw new Error("The recipe service returned an empty response.");
      }

      setRecipe(recipeMarkdown);
      setStatusMessage(
        "Recipe generated. Chef Nervous Robot's recommendation is below.",
      );
    } catch (caughtError) {
      if (import.meta.env.DEV) {
        console.error("Recipe generation failed:", caughtError);
      }

      setError(getRecipeErrorMessage(caughtError));
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main id="main-content" tabIndex="-1">
      <p className="visually-hidden" role="status" aria-atomic="true">
        {statusMessage}
      </p>
      <section
        className="ingredient-builder"
        aria-labelledby="ingredient-builder-heading"
      >
        <h2 id="ingredient-builder-heading">What's in your kitchen?</h2>

        <p>Add ingredients you already have available.</p>

        <AddIngredient
          ingredients={ingredients}
          setIngredients={setIngredients}
          resetRecipe={resetRecipe}
          setStatusMessage={setStatusMessage}
        />
      </section>

      {ingredients.length > 0 && (
        <>
          <AvailableIngredientsList
            ingredients={ingredients}
            setIngredients={setIngredients}
            resetRecipe={resetRecipe}
            setStatusMessage={setStatusMessage}
          />

          <section
            className="exclusions-section"
            aria-labelledby="exclusions-heading"
          >
            <h2 id="exclusions-heading">Anything off-limits?</h2>

            <p>Tell Chef Nervous Robot what must not appear.</p>

            <div className="exclude-checkbox">
              <label>
                <input
                  type="checkbox"
                  checked={showExclusions}
                  onChange={handleExclusionsChange}
                />
                I want to exclude ingredients
              </label>
            </div>

            {showExclusions && (
              <div className="exclusion-controls">
                <ExcludeIngredient
                  exIngredients={exIngredients}
                  setExIngredients={setExIngredients}
                  resetRecipe={resetRecipe}
                  setStatusMessage={setStatusMessage}
                />
              </div>
            )}

            {exIngredients.length > 0 && (
              <ExcludedIngredientsList
                exIngredients={exIngredients}
                setExIngredients={setExIngredients}
                resetRecipe={resetRecipe}
                setStatusMessage={setStatusMessage}
              />
            )}
          </section>

          <Diet diet={diet} setDiet={setDiet} resetRecipe={resetRecipe} />
          <Ready
            ingredients={ingredients}
            getRecipe={getRecipe}
            isLoading={isLoading}
            error={error}
          />
        </>
      )}
      {recipe && <Recipe recipe={recipe} />}
    </main>
  );
}

export default Main;
