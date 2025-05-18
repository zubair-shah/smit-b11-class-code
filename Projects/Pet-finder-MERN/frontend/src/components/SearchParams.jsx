import { useState, useEffect, useContext } from "react";
import useBreedList from "../hooks/useBreedList";
import { useQuery } from "@tanstack/react-query";
import Results from "./Results";
import fetchSearch from "../helper/fetchSearch";
import { apiUrl } from "../config/apiUrl";
const ANIMALS = ["Select an Option", "bird", "cat", "dog", "rabbit", "reptile"];
import AdoptedPetContext from "../../context/AdoptedPetContext";
// const apiUrl = import.meta.env.VITE_API_URL;
function SearchParams() {
  const [animal, setAnimal] = useState("");
  const [adoptedPet] = useContext(AdoptedPetContext)
  const [requestParams, setRequestParams] = useState({
    location: "",
    animal: "",
    breed: "",
  });
  const [breeds, status] = useBreedList(animal)
  const results = useQuery([requestParams, "zubair", "ali"], fetchSearch);
  const pets = results?.data?.pets ?? [];
  console.log(apiUrl)
  const handleAnimalChange = (e) => {
    console.log("e", e);
    let value = e.target.value;
    setAnimal(value);
  };
  console.log("adoptedPet", adoptedPet)
  return (
    <div className="search-params">
      <form onSubmit={(e) => {
        console.log('e running', e.target)
        e.preventDefault();
        const formData = new FormData(e.target);
        const obj = {
          animal: formData.get("animal") ?? "",
          location: formData.get("location") ?? "",
          breed: formData.get("breed") ?? ""
        }
        setRequestParams(obj)
        console.log(obj)
      }}>
        {
          adoptedPet ? (
            <div className="pet image-container">
              <img src={adoptedPet.images[0]} alt={adoptedPet.name} />
            </div>
          ) : null // you have to remove this semi-colon, my auto-formatter adds it back if I delete it
        }

        <label htmlFor="location">
          Location
          <input
            id="location"
            name="location"
            type="text"
            placeholder="Location"
          />
        </label>
        <label htmlFor="animal">
          Animal
          <select
            name="animal"
            id="animal"
            value={animal}
            onChange={handleAnimalChange}
            onBlur={handleAnimalChange}
          >
            {ANIMALS.map((item, index) => {
              return (
                <option key={index} value={item}>
                  {item}
                </option>
              );
            })}
          </select>
          <label htmlFor="breed">
            {
              status === "loading" ? "Loading..." : "Breed"
            }
            <select
              disabled={!breeds.length}
              id="breed"
              name="breed"
            >
              {breeds.map((breed, index) => (
                <option key={index} value={breed}>
                  {breed}
                </option>
              ))}

            </select>
          </label>
        </label>
        <button type="submit">Submit </button>
        {/* <Button variant="contained">Submit</Button> */}
      </form>
      <Results pets={pets} />
    </div>
  );
}

export default SearchParams;
