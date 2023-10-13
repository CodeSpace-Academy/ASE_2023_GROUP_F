import React from 'react'; 

    function RecipeTags(props) {
      const { tags } = props; 
    
      return (
        <div>
          {tags.map(tag => (
            <button key={tag}>{tag}</button> 
          ))}
        </div>
      );
    }
    
    export default RecipeTags;