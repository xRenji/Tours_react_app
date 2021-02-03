import React, { useState, useEffect } from 'react'
import Loading from './Loading'
import Tours from './Tours'
// Api from tutorial course
const url = 'https://course-api.com/react-tours-project'
function App() {
  //state values
  const [loading,setLoading] = useState(true);
  const [tours, setTours] = useState([]);

  //remove tours function
  const removeTour=(id)=> {
    const newTours = tours.filter((tour)=>tour.id!==id);
    
    setTours(newTours);
  };

  //FETCHING DATA
  const fetchTours = async () => {
    setLoading(true) // if setLoading is false, turns back to true
    try {
    const response = await fetch(url);
    const tours = await response.json();
    setLoading(false);
    setTours(tours);
    } catch (error) {
      setLoading(false)
      console.log(error)
    }

  };
  useEffect(() => {
    fetchTours();
  }, [])
  if (loading){
    return (<main>
      <Loading/>
    </main>);

  }  
  if (tours.length==0) {
    return (<main>
      <div className="title">
        <h2>no tours left</h2>
        <button className="btn"onClick={fetchTours}>refresh</button>
      </div>
    </main>)
  }
  return <main><Tours tours={tours} removeTour={removeTour}/></main>
}

export default App
