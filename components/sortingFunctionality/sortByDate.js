import React, { useState, useEffect } from "react";

export default function SortByDate({ recipeId }) {
  const [sort, setSort] = useState(""); // Initialize sort criteria, e.g., 'asc' or 'desc'
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData(); // Fetch data when the component mounts or when the sorting criteria changes
  }, [sort]);

  const fetchData = async () => {
    setIsLoading(true);
  
    try {
      const response = await fetch(`/api/getRecipes`);
      if (response.ok) {
        let result = await response.json();
  
        // Apply sorting logic here
        if (sort === "asc") {
          result = result.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sort === "desc") {
          result = result.sort((a, b) => b.name.localeCompare(a.name));
        }
  
        setData(result);
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  
    setIsLoading(false);
  };
  

  const handleSort = (criteria) => {
    setSort(criteria);
  };

  return (
    <div>
      <button onClick={() => handleSort("asc")}>Sort Ascending</button>
      <button onClick={() => handleSort("desc")}>Sort Descending</button>
      
 
    </div>
  );
}
