import React,{ useState,useEffect} from 'react'
import axios from "axios";
import {navigate} from '@reach/router'
import {Alert} from 'react-bootstrap'



export default function Form({initialState,method,url}) {
    const [formState, setFormState] = useState(initialState);
    const [errors, setErrors] = useState([]);
    useEffect(() => {
        axios
          .get("http://localhost:5000/api/pirates",{
              withCredentials:true
          })
        //   .then(res=>console.log(res))
          .then(res => setFormState(res.data))
          .catch(err => {
            console.log(err);
            navigate('/')
          });
    }, [])
    function handleChange(event){
        setFormState({
            ...formState,
            [event.target.name]:event.target.value
        })
    }

    function handleClick(event){
        
    }

    function handleSubmit(event){
        event.preventDefault();

        setErrors([]);
        console.log(formState)
        axios({
            method,
            url,
            data:formState
        },{withCredentials:true})
        .then( response=>{
            console.log("real res----->"+ response);
            navigate('/pirates/'+response.data._id)})
        .catch(err=>{
            console.log("real err here++>" + err);
            const newErrors = [];
            const innerErrors = err.response.data.errors;
            for(const key in innerErrors){
                newErrors.push(innerErrors[key].message);
                
            }

            setErrors(newErrors)
        })
    }
    return (
        <div>
            <h1>Add Pirate</h1>
            
            <form onSubmit={handleSubmit}>
        {errors.map((error,i) => (
            <Alert variant="danger">
            <Alert.Heading key={i}>{error}</Alert.Heading>
            </Alert>
        ))}
            <label>pirateName</label>
            <input type="text" name="pirateName" value={formState.pirateName} onChange={handleChange}/>
            <label>imageUrl</label>
            <input type="text" name="imageUrl" value={formState.imageUrl} onChange={handleChange}/>
            <label>crewPosition</label>
            <input type="text" name="crewPosition" value={formState.crewPosition} onChange={handleChange}/>
            <label>numOfTreasureChests</label>
            <input type="number" name="numOfTreasureChests" value={formState.numOfTreasureChests} onChange={handleChange}/>
            <label>pirateCatchPhrase</label>
            <input type="text" name="pirateCatchPhrase" value={formState.pirateCatchPhrase} onChange={handleChange}/>
            <label>
            <input type="checkbox" checked={formState.isPegLeg} onClick={handleClick}/> Peg Leg</label><br/>
            <label>
            <input type="checkbox" checked/> Eye Patch</label><br/>
            <label>
            <input type="checkbox" checked/> Hook Hand</label><br/>
            <br/>
            <button variant="primary">Submit</button>
          
            </form>
        </div>
    )
}
