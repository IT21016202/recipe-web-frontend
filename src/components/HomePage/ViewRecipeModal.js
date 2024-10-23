import React, {useEffect, useState} from 'react';
import { Modal, Button, Table } from 'react-bootstrap';
import axios from 'axios';

const ViewRecipeModal = ({ show, handleClose, id }) => {
    const [recipe, setRecipe] = useState(null);

    useEffect(() => {
        getRecipeDetails();
    }, [id]);

    const getRecipeDetails = async () => {
        if (id) {
            axios.get('https://themealdb.com/api/json/v1/1/lookup.php?i='+id)
            .then(response => {
                setRecipe(response.data.meals[0]);
            })
            .catch(error => {
                console.error('Error in getting recipe details', error);
            });
        }
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>
                    {recipe && (
                        <h5 className='mb-3'><strong>{recipe.strMeal}</strong></h5>
                    )}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {recipe ? (
                    <div>
                        <img src={recipe.strMealThumb} alt={recipe.strMeal} style={{width: '100%'}} />
                        <p className='mt-3'><i>Category: {recipe.strCategory}</i></p>
                        <p className='mt-3 recipe-description'>{recipe.strInstructions}</p>
                        <p className='mt-3'>Area: {recipe.strArea}</p>
                        <h6 className='mt-3'>Ingredients</h6>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Ingredient</th>
                                    <th>Measure</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.keys(recipe).map((key, index) => {
                                    if(key.includes('strIngredient') && recipe[key]){
                                        return (
                                            <tr key={index}>
                                                <td>{recipe[key]}</td>
                                                <td>{recipe['strMeasure'+key.slice(-1)]}</td>
                                            </tr>
                                        )
                                    }
                                })}
                            </tbody>
                        </Table>
                        <p className='mt-3'><strong>Video Tutorial:</strong></p>
                        <iframe width="100%" height="300px" src={recipe.strYoutube.replace('watch?v=', 'embed/')} title="YouTube video player" frameborder="0" allow="autoplay; picture-in-picture" allowfullscreen></iframe>
                    </div>
                    ) : (
                    <p>No Recipe selected</p>
                    )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ViewRecipeModal;
