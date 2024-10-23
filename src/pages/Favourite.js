import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import axios from 'axios';
import ViewRecipeModal from '../components/HomePage/ViewRecipeModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const Favourite = () => {
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const token = localStorage.getItem('recipe_token');
    const [recipes, setRecipes] = useState([]);
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [showModal, setShowModal] = useState(false);

    // Get all user favorite recipes
    const getFavorites = async () => {
        axios.get(BASE_URL+'/api/recipes/favorites', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        })
        .then(response => {
            setRecipes(response.data.favorites);
        })
        .catch(error => {
            console.error('Error in getting favorites', error);
        });
    }
   
    useEffect(() => {  
        getFavorites();
    },[]) ; 

    // View recipe modal
    const handleViewRevipe = (id) => {
        setSelectedRecipe(id);
        setShowModal(true);
    };

    // Remove recipe from favorite
    const removeFromFavourite = (recipeId) => {
        const res = window.confirm('Are you sure you want to remove this recipe from your favourite?');
        if (!res) {
            return;
        }

        axios.delete(BASE_URL+'/api/recipes/favorites/'+recipeId, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        })
        .then(response => {
            alert(response.data.message);
            getFavorites();
        })
        .catch(error => {
            console.error('Error in removing from favorites', error);
        });
    }

    return (
        <div>
            <NavBar />
            <div className='container mt-5'>
                <h4 className='mt-3 mb-5' style={{color: '#ff4f81'}}><b>Favourite Recipes</b></h4>
                <div className='d-flex flex-wrap justify-content-start gap-3'>
                    {recipes?.map((recipe, index) => (
                        <div className='card recipe-card' style={{width: '15rem'}}>
                            <a href='#' onClick={() => handleViewRevipe(recipe.recipeId)} className='recipe-card-a'>
                                <img src={recipe.image} className='card-img-top' alt={recipe.name} />
                            </a>    
                                <div className='card-body'>
                                    <div className='d-flex justify-content-between'>
                                        <p>{recipe.category}</p> 
                                        <a href='#' onClick={() => removeFromFavourite(recipe.recipeId)}><FontAwesomeIcon icon={faTimes} style={{color: '#ff4f81', fontSize: '20px'}}/></a>
                                    </div>
                                    <a href='#' onClick={() => handleViewRevipe(recipe.recipeId)} className='recipe-card-a'>
                                        <h6 className='card-title'>{recipe.name}</h6>
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

export default Favourite