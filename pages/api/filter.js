import connectToDatabase from "../../database/database";

export default async function handler(req, res) {
	const filter = JSON.parse(req.query.filter);
	const sort = JSON.parse(req.query.sort);
	const limit = parseInt(req.query.limit) || 200;

	if (req.method === "GET") {
		try {
			const database = await connectToDatabase();
			const collection = database.collection("recipes");

			const agg = []
			const queryFilter = {};

			if (filter.category) {
				queryFilter.category = {
					$regex: new RegExp(filter.category, "i"),
				};
			}

			if (filter.tags && Array.isArray(filter.tags)) {
				queryFilter.tags = {
					$in: filter.tags.map((tag) => new RegExp(tag, "i")),
				};
			} else if (filter.tags) {
				queryFilter.tags = {
					$regex: new RegExp(filter.tags, "i"),
				};
			}

			if (filter.title) {
				queryFilter.title = {
					$regex: new RegExp(filter.title, "i"),
				};
			}

			if (filter.ingredients) {
				queryFilter[`ingredients.${filter.ingredients}`] = { $exists: true };
			}

			if (filter.instructions) {
				queryFilter[`instructions.${filter.instructions}`] = { $exists: false };
			}

			let querySort = {};

			if (sort === 'prep ASC') {
				querySort.prep = 1;
			} else if (sort === 'prep DESC') {
				querySort.prep = -1;
			}

			if (sort === 'cook ASC') {
				querySort.cook = 1;
			} else if (sort === 'cook DESC') {
				querySort.cook = -1;
			}

			if (sort === 'date ASC' ) {
				querySort.published = 1;
			} else if (sort === 'date DESC') {
				querySort.published = -1;
			}		  

			if (sort === 'instructions ASC') {
				querySort.instructions = 1;
			  } else if (sort === 'instructions DESC') {
				querySort.instructions = -1;
			}

			if (JSON.stringify(querySort !== "{}")) {
				if (querySort.instructions) {
					agg.push(
						{
							'$unwind': {
							  'path': '$instructions',
							},
						  },
						  {
							'$group': {
							  '_id': '$_id',
							  'length': {
								'$sum': 1,
							  },
							},
						  },
						  {
							'$sort': {
							  'length': 1,
							},
						  },
						  {
							'$lookup': {
							  'from': 'recipes',
							  'localField': '_id',
							  'foreignField': '_id',
							  'as': 'recipe',
							},
						  },

					

			if (sort === 'instructions ASC') {
				querySort = [
				  {
					'$unwind': {
					  'path': '$instructions',
					},
				  },
				  {
					'$group': {
					  '_id': '$_id',
					  'length': {
						'$sum': 1,
					  },
					},
				  },
				  {
					'$sort': {
					  'length': 1,
					},
				  },
				  {
					'$lookup': {
					  'from': 'recipes',
					  'localField': '_id',
					  'foreignField': '_id',
					  'as': 'recipe',
					},
				  },
				];
			  } else if (sort === 'instructions DESC') {
				querySort = [
				  {
					'$unwind': {
					  'path': '$instructions',
					},
				  },
				  {
					'$group': {
					  '_id': '$_id',
					  'length': {
						'$sum': 1,
					  },
					},
				  },
				  {
					'$sort': {
					  'length': -1,
					},
				  },
				  {
					'$lookup': {
					  'from': 'recipes',
					  'localField': '_id',
					  'foreignField': '_id',
					  'as': 'recipe',
					},
				  },
				];
				console.log('fetching', querySort);
			  }
			  
			  if (JSON.stringify(queryFilter) !== '{}') {
				agg.push({'$match': {...queryFilter}})
			  }

			  agg.push({'$limit':limit})

			const documents = await collection
			.aggregate(agg)
				// .find(queryFilter)
				// .sort(querySort)
				// .limit(limit)
				.toArray();

			const number = await collection.countDocuments(queryFilter);

			res.status(200).json({ recipes: documents, count: number });
		} catch (error) {
			console.error("Error fetching data:", error);
			res.status(500).json({ message: "Data fetching failed" });
		}
	} else if (req.method === "POST") {
		try {
			const database = await connectToDatabase();
			const collection = database.collection("recipes");

			const { recipeId, isFavorite } = req.body;
			await collection.updateOne(
				{ _id: recipeId },
				{ $set: { isFavorite: isFavorite } },
			);

			res.status(200).json({
				message: `Recipe ${
					isFavorite ? "marked as" : "unmarked from"
				} favorite`,
			});
		} catch (error) {
			console.error("Error updating favorite status:", error);
			res.status(500).json({ message: "Failed to update favorite status" });
		}
	} else {
		res.status(405).json({ message: "Method not allowed" });
	}
}
