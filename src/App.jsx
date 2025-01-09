import axios from 'axios';
import { useEffect } from 'react'
import './App.css'
import { useState } from 'react';

function App() {
  const [data, setData] = useState();
  const [number, setNumber] = useState(1);
  var URL=`https://pokeapi.co/api/v2/pokemon/${number}`
  var num;
  useEffect(()=>{
    axios.get(URL).then((response) => {
      setData(response.data);
      console.log(response.data)
    }).catch((err)=>{
      window.alert(err);
      console.log(URL);
    })
  },[URL])
  return (
    <>
    <br></br>
      <h1 className='heading'>Pokedex</h1><br></br>
      <center>
      <input type='number' placeholder="Number" onChange={(e)=>{e.target.valueAsNumber>0?setNumber(e.target.valueAsNumber):setNumber(1)}}></input>
      <p className='display'>{data?data.name:"null"}</p>
      <img src={data?data.sprites.other.dream_world.front_default:"/src/assets/loading.webp"} width="30%" />
      </center>
    </>
  )
}
export default App
