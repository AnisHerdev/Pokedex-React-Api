import axios from 'axios';
import { useEffect } from 'react'
import { useState } from 'react';
import './App.css'

function App() {
  const [data, setData] = useState();
  const [number, setNumber] = useState(1);
  var URL=`https://pokeapi.co/api/v2/pokemon/${number}`
  const maxValue=1025;
  useEffect(()=>{
    if(number!=null && number<=maxValue){
      axios.get(URL).then((response) => {
        setData(response.data);
        console.log(response.data)
      }).catch((err)=>{
        window.alert(err);
        console.log(URL);
      })
    }
  },[URL])

  useEffect(()=>{
    if(data){
      const audio = new Audio(data.cries.latest);
      audio.play().catch((err)=> {
        console.error("Error playing the audio:",err);
      });
    }else{
      console.log("Audio not found...");
    }
  }, [data]);

  const handlePlay= () => {
    const audio = new Audio(data.cries.latest);
    audio.play().catch((err)=> {
      console.error("Error playing the audio:",err);
    });
  }
  
  return (
    <>
    <br></br>
      <h1 className='heading'>Pokedex</h1><br></br>
      <center>
      <input type='number' value={number || ""} onChange={(e)=>{e.target.valueAsNumber>0?setNumber(e.target.valueAsNumber):setNumber(null)}} max={1025}></input>
      <p style={{fontSize: 'xx-large'}}><b>Name:</b> {data?data.name:"null"}</p>
      <img src={data?data.sprites.other.dream_world.front_default:"/src/assets/loading.webp"} width="300px" />
      <div className='display'>
        <b>Abilities:</b>
        {data?data.abilities.map((value,key)=>{
          return(<div key={key} className='ability'>{value.ability.name}</div>)
        }):<p>Not found</p>}
      </div>
      <div className='display'>
        <b>Weight:</b> {data?data.weight:"null"} <br></br>
        <b>Height:</b> {data?data.height:"null"}
      </div>

      <button className="display btn btn-light" onClick={handlePlay} >Hear sound</button>
      </center>
      <br></br>
    </>
  )
}
export default App
