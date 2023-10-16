import {getViewRecipes} from "../lib/view-recipes"
import { useEffect } from "react";


const Home = () => {
	useEffect(() => {
		const callGetRecipes = async () => {
			const results = await getViewRecipes()
			console.log('results = ', results)
		}
		callGetRecipes()
	},[])
	return(
		<h1>Home page</h1>
	)
};

export default Home;