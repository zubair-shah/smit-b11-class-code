import React from 'react'
import Pet from './Pet'
function Results({pets}) {
  return (
    <div className="search">
        
        {!pets.length ? (
           <h1>No Pets Found</h1> 
        ):(
            pets.map((pet,index) => {
                return(
                  <Pet 
                //   item={data}
                  animal={pet.animal}
                  key={pet.id}
                  name={pet.name}
                  breed={pet.breed}
                  images={pet.images}
                  location={`${pet.city}, ${pet.state}`}
                  id={pet.id}
                  />
                )
               
              })
        )}
        </div>
  )
}

export default Results