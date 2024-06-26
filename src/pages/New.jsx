import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Two Things make a component distinctly a CONTROLLED COMPONENT:
// 1 - "value" prop on inputs
// 2 - "onChange" handler on inputs

// A controlled component gets its value from the state. The state is what controls what the value for each input will be. Inputs get their value from state.

const New = () => {
    const navigate = useNavigate();
    const [newBookmark, setNewBookmark] = useState({
        name: "",
        url: "",
        category: "",
        is_favorite: false
    })
    const API = import.meta.env.VITE_BASE_URL

    const handleChange = (e) => {
        // console.log(e.target.name)
        setNewBookmark((prevState) => {
            return {...prevState, [e.target.name]: e.target.value }
        })
    }

    const handleCheckBox = () => {
        const favorited = !newBookmark.is_favorite;
        setNewBookmark({...newBookmark, is_favorite: favorited});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(API, {
            method: "POST",
            body: JSON.stringify(newBookmark),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then((res) => {
                console.log(res);
                navigate("/");
            })
            .catch(err => console.log(err));
    }

    return (
        <form onSubmit={handleSubmit}>
            <fieldset>
                <legend>New Bookmark</legend>
                <input 
                    type="text"
                    placeholder="Bookmark Name"
                    name="name"
                    value={newBookmark.name}
                    onChange={handleChange}
                />
                <br/>
                <input 
                    type="text" 
                    placeholder='URL'
                    name="url"
                    value={newBookmark.url}
                    onChange={handleChange}
                />
                <br/>
                <input 
                    type="text" 
                    placeholder='Category'
                    name="category"
                    value={newBookmark.category}
                    onChange={handleChange}
                />
                <br/>
                <input 
                    type="checkbox" 
                    id="fav"
                    checked={newBookmark.is_favorite}
                    onChange={handleCheckBox}
                />
                <label htmlFor="fav">Favorite</label>
                <br/>
                <input type="submit" value="Submit"/>
            </fieldset>
        </form>
    )
};

export default New;