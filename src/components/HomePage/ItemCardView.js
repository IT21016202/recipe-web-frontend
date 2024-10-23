import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'; 
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import ViewRecipeModal from './ViewRecipeModal';

const ItemCardView = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const category = queryParams.get('cat');
    const [recipes, setRecipes] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const BASE_URL = process.env.REACT_APP_BASE_URL;

    useEffect(() => {
        getRecipes();
    }, [category]);

    const getRecipes = async () => {
        axios.get('https://themealdb.com/api/json/v1/1/filter.php?c='+category)
        .then(response => {
            setRecipes(response.data.meals);
        })
        .catch(error => {
            console.error('Error in getting recipes', error);
        });
    }
    

    const handleViewRevipe = (id) => {
        setSelectedRecipe(id);
        setShowModal(true);
    };

    const addToFavourite = (recipeData) => {
        const res = window.confirm('Are you sure you want to add this recipe to your favourite?');
        if (!res) {
            return;
        }

        const token = localStorage.getItem('recipe_token');
        if (!token) {
            alert('Please login to add to favourite');
            return;
        }

        const { id, name, image, category } = recipeData;
        const favoriteRecipe = {
            recipeId: id,
            name : name,
            image: image,
            category: category
        }

        axios.post(BASE_URL+'/api/recipes/favorites', favoriteRecipe, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        })
        .then(response => {
            console.log(response);
            alert('Recipe added to favourite successfully');
        })
        .catch(error => {
            console.error('Error in adding to favourite', error);
            alert(error.response.data.message);
        });
    }
    
    return (
        <div>
            <div className='container mt-5'>
                <div className='d-flex flex-wrap justify-content-start gap-3'>
                    {recipes?.map((recipe, index) => (
                        <div className='card recipe-card' style={{width: '15rem'}}>
                            <a href='#' onClick={() => handleViewRevipe(recipe.idMeal)} className='recipe-card-a'>
                                <img src={recipe.strMealThumb} className='card-img-top' alt={recipe.strMeal} />
                            </a>    
                                <div className='card-body'>
                                    <div className='d-flex justify-content-between'>
                                        <p>{category}</p> 
                                        <a href='#' onClick={() => addToFavourite({id: recipe.idMeal, name: recipe.strMeal, image: recipe.strMealThumb, category: category})}><FontAwesomeIcon icon={faHeart} style={{color: '#ff4f81'}}/></a>
                                    </div>
                                    <a href='#' onClick={() => handleViewRevipe(recipe.idMeal)} className='recipe-card-a'>
                                        <h6 className='card-title'>{recipe.strMeal}</h6>
                                    </a>    
                                </div>
                        </div>
                    ))}
                </div>
            </div>
            {selectedRecipe && (
                <ViewRecipeModal
                    show={showModal}
                    handleClose={() => setShowModal(false)}
                    id={selectedRecipe}
                />
            )}
        </div>
    )
}

export default ItemCardView