import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import fetchBreedList from "../helper/fetchBreedList";

function useBreedList(animal) {
    console.log("provided animal", animal)
    const results = useQuery(["breeds", animal], fetchBreedList);


    return [results?.data?.breeds ?? [], results.status];
}

export default useBreedList