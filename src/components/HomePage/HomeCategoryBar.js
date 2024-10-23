import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

const HomeCategoryBar = () => {

    const [categories, setCategories] = useState([]);  
    const location = useLocation(); 

    useEffect(() => {
        getCategories();
    }
    , []);

    const getCategories = async () => {
        axios.get('https://themealdb.com/api/json/v1/1/categories.php')
        .then(response => {
            setCategories(response.data.categories);
        })
        .catch(error => {
            console.error('Error in getting categories', error);
        });
    }

    return (
        <div className='container mt-5'>
            <div className='d-flex flex-wrap justify-content-start gap-3'>
                {categories.slice(0,5).map((category, index) => (
                    <Nav key={index}>
                        <Nav.Item>
                            <Nav.Link as={Link} to={`/home?cat=${category.strCategory}`} className={`btn-category ${location.search === `?cat=${category.strCategory}` ? 'btn-category-active' : ''}`}><b>{category.strCategory}</b></Nav.Link>
                        </Nav.Item>
                    </Nav>
                ))}
            </div>
        </div>
    )
}

export default HomeCategoryBar