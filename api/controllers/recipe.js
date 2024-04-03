const asyncHandler = require("express-async-handler");
const cloudinary = require("../middleware/cloudinary");
const Recipe = require("../models/Recipe");

/**
 ** @desc    add recipe
 ** @route   POST /api/recipes
 ** @access  Private
 */
const addRecipe = asyncHandler(async (req, res) => {
	try {
		console.log("adding recipe to db...", req.body, req.user, req.file);
		const { name, ingredients, steps, category } = req.body;

		if (!req.file) {
			console.log("error no file provided");
			res.status(400).json("Please add image and ensure image is the right file");
			return;
		}

		let cloudinaryImg = await cloudinary.uploader.upload(req.file.path);

		if (!name) {
			console.log("error no name provided");
			res.status(400).json("Please give your recipe a name");
			return;
		}

		if (ingredients.length === 0) {
			console.log("error no ingredients provided");
			res.status(400).json("Please add your ingredients");
			return;
		}

		if (steps.length === 0) {
			console.log("error no instructions provided");
			res.status(400).json("Please add how to make this recipe");
			return;
		}
		console.log(JSON.parse(ingredients))
		const recipe = await Recipe.create({
			user: req.user.id,
			name: name,
			ingredients: JSON.parse(ingredients),
			steps: JSON.parse(steps),
			likes: 0,
			category: category,
			image: cloudinaryImg.secure_url,
			cloudinaryId: cloudinaryImg.public_id,
		});

		res.status(200).json(recipe);
	} catch (error) {
		console.log(error);
		res.status(400).json("Sorry something went wrong. Couldn't add recipe");
	}
});

/**
 ** @desc    get one recipe
 ** @route   GET /api/recipes/:id
 ** @access  Public
 */
const getRecipe = asyncHandler(async (req, res) => {
	try {
		console.log(`getting ${req.params.id} recipe from db...`);
		const recipe = await Recipe.findById(req.params.id);

		if (!recipe) {
			res.status(400).json("Recipe not found");
			return;
		}

		res.status(200).json(recipe);
	} catch (error) {
		console.log(error);
		res.status(400).json("Recipe not found");
	}
});

/**
 ** @desc    get all recipes
 ** @route   GET /api/recipes
 ** @access  Public
 */
const getRecipes = asyncHandler(async (req, res) => {
	try {
		console.log("getting recipes...", req.query);
		const { category, search, ingredients } = req.query;
		if (category) {
			const recipes = await Recipe.find({ category: category });
			res.status(200).json(recipes);
		} else if (search) {
			const recipes = await Recipe.find({ $text: { $search: search } });
			res.status(200).json(recipes);
		} else if (ingredients) {
			const recipes = await Recipe.find({
				ingredients: {
					$all: ingredients.split(",").map((ingredient) => new RegExp(ingredient.trim(), "i")),
				},
			});
			res.status(200).json(recipes);
		} else {
			const recipes = await Recipe.find();
			res.status(200).json(recipes);
		}
	} catch (error) {
		console.log(error);
		res.status(400).json("Sorry something went wrong. Couldn't get recipes");
	}
});

/**
 ** @desc    get user recipes
 ** @route   GET /api/user/:id
 ** @access  Public
 */
const getUserRecipes = asyncHandler(async (req, res) => {
	try {
		console.log(`getting user (${req.params.id}) recipes from db...`);
		const recipes = await Recipe.find({ user: req.params.id });
		console.log(recipes);

		if (!recipes) {
			res.status(400).json("No recipes found");
			return;
		}

		res.status(200).json(recipes);
	} catch (error) {
		console.log(error);
		res.status(400).json("Sorry something went wrong");
	}
});

/**
 ** @desc    edit recipe
 ** @route   PUT /api/recipes/edit/:id
 ** @access  Private
 */
const editRecipe = asyncHandler(async (req, res) => {
	try {
		console.log("editing recipe from db", req.params.id, req.body);
		const recipe = await Recipe.findById(req.params.id);
		const { name, ingredients, steps, category, isImageEdited } = req.body;

		if (!recipe) {
			res.status(400).json("Recipe not found");
			return;
		}

		let editedValues = {}
		if (isImageEdited && !req.file) {
			res.status(400).json("Please add image and ensure image is the right file");
			return;
		}
		if (req.file) {
			console.log("old",recipe.cloudinaryId)
			await cloudinary.uploader.destroy(recipe.cloudinaryId);
			let cloudinaryImg = await cloudinary.uploader.upload(req.file.path);
			console.log("new", cloudinaryImg.public_id);
			editedValues = {
				image: cloudinaryImg.secure_url,
				cloudinaryId: cloudinaryImg.public_id,
				...editedValues,
			};
		}
		if (!name) {
			console.log("error no name provided");
			res.status(400).json("Please give your recipe a name");
			return;
		}
		if (ingredients.length === 0) {
			console.log("error no ingredients provided");
			res.status(400).json("Please add your ingredients");
			return;
		}
		if (steps.length === 0) {
			console.log("error no instructions provided");
			res.status(400).json("Please add how to make this recipe");
			return;
		}

		editedValues = {
			name,
			ingredients: JSON.parse(ingredients),
			steps: JSON.parse(steps),
			category,
			...editedValues,
		};

		console.log(editedValues);
		const editedRecipe = await Recipe.findByIdAndUpdate(
			{ _id: req.params.id },
			editedValues
		);

		res.status(200).json(editedRecipe);
	} catch (error) {
		console.log(error);
		res.status(400).json("Sorry something went wrong. Couldn't edit recipe");
	}
});

/**
 ** @desc    delete recipe
 ** @route   DELETE /api/recipes/delete/:id
 ** @access  Private
 */
const deleteRecipe = asyncHandler(async (req, res) => {
	try {
		console.log("deleting from db", req.params.id);
		const recipe = await Recipe.findById(req.params.id);

		await cloudinary.uploader.destroy(recipe.cloudinaryId);

		if (!recipe) {
			res.status(400).json("Recipe not found");
		}
		if (!req.user) {
			res.status(401).json("User not found");
			return;
		}

		// make sure logged in user created the recipe
		if (recipe.user.toString() !== req.user.id) {
			res.status(401).json("User not authorized");
			return;
		}
		console.log("deleting...", recipe);

		await Recipe.deleteOne({ _id: req.params.id });

		res.status(200).json({ id: req.params.id });
	} catch (error) {
		console.log(error);
		res.status(400).json("Sorry something went wrong. Couldn't delete recipe");
	}
});

module.exports = {
	addRecipe,
	getRecipe,
	getRecipes,
	getUserRecipes,
	editRecipe,
	deleteRecipe,
};
