'use client'
import { useRouter } from "next/navigation";
type Props ={
    setArea: () => void;
    setGenre: () => void;
    setPlaceType: () => void;
    setResults: () => void;
    setHasSearched: () => void;
    setSelectedGenres: () => void;
    setSelectedArea: () => void;
}
export default function ({setArea,setSelectedArea, setSelectedGenres, setGenre, setPlaceType, setResults, setHasSearched} : Props){
    const router = useRouter();
    return(
        <button
                type="button"
                onClick={() => {
                  setArea();
                  setGenre();
                  setPlaceType();
                  setResults();
                  setHasSearched();
                  setSelectedGenres();
                  setSelectedArea();
                  router.push('/');
                }}
                className="ml-4 text-sm text-gray-500 underline hover:text-gray-700"
              >
                条件をリセット
              </button>
    )
}