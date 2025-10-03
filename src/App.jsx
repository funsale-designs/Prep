import { useState } from "react";

export default function RecipeScaler() {
  const [recipe, setRecipe] = useState("");
  const [servings, setServings] = useState(1);
  const [result, setResult] = useState(null);

  const generatePrepList = () => {
    const lines = recipe.split("\n").filter((l) => l.trim() !== "");
    const ingredients = [];

    lines.forEach((line) => {
      const match = line.match(/([\d/.]+)\s*(\w*)\s*(.+)/);
      if (match) {
        let qty = eval(match[1]) * servings;
        let unit = match[2];
        let item = match[3];
        ingredients.push({ qty, unit, item });
      } else {
        ingredients.push({ qty: "-", unit: "", item: line });
      }
    });

    const prepTasks = ingredients.map((ing) => {
      const item = ing.item.toLowerCase();
      if (item.includes("onion"))
        return `Chop ${ing.qty} ${ing.unit} ${ing.item}`;
      if (item.includes("tomato"))
        return `Dice ${ing.qty} ${ing.unit} ${ing.item}`;
      if (item.includes("chicken"))
        return `Cut ${ing.qty} ${ing.unit} ${ing.item} into pieces`;
      return `Prepare ${ing.qty} ${ing.unit} ${ing.item}`;
    });

    setResult({ ingredients, prepTasks });
  };

  return (
    <div style={{ maxWidth: "600px", margin: "2rem auto", fontFamily: "Arial" }}>
      <h1>Recipe Ingredient & Prep Calculator</h1>

      <textarea
        rows="6"
        placeholder="Enter recipe (e.g. 2 onions, 3 tomatoes, 500g chicken)..."
        style={{ width: "100%", marginBottom: "1rem" }}
        value={recipe}
        onChange={(e) => setRecipe(e.target.value)}
      />

      <input
        type="number"
        placeholder="Number of servings"
        style={{ width: "100%", marginBottom: "1rem", padding: "0.5rem" }}
        value={servings}
        onChange={(e) => setServings(e.target.value)}
      />

      <button
        onClick={generatePrepList}
        style={{
          background: "#4CAF50",
          color: "white",
          padding: "0.7rem 1.5rem",
          border: "none",
          cursor: "pointer",
        }}
      >
        Generate
      </button>

      {result && (
        <div style={{ marginTop: "2rem" }}>
          <h2>Ingredients Needed:</h2>
          <ul>
            {result.ingredients.map((ing, i) => (
              <li key={i}>
                {ing.qty} {ing.unit} {ing.item}
              </li>
            ))}
          </ul>

          <h2>Prep List:</h2>
          <ul>
            {result.prepTasks.map((task, i) => (
              <li key={i}>{task}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
