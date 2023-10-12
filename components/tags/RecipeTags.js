
import { dummyRecipes } from  '../../pages/tags/dummyRecipes'; 


function RecipeTags() {

 
   return (
    <div>
      {dummyRecipes.map((recipe) => (
        <div key={recipe.id}>
          <ul>
            {recipe.tags.map((tag) => (
             <>
             {console.log(recipe.tags)}
              <li key={tag}>{tag}</li>
             </>
            ))}
          </ul>
        </div>
      ))}

    </div>
  );
}

export default RecipeTags;
