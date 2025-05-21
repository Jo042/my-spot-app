'use client'
import { useRouter } from "next/navigation";
type Props ={
    setArea: () => void;
    setGenre: () => void;
    setPlaceType: () => void;
    setResults: () => void;
    setHasSearched: () => void;
    setSelectedGenre: () => void;
}
export default function ({setArea, setSelectedGenre, setGenre, setPlaceType, setResults, setHasSearched} : Props){
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
                  setSelectedGenre();
                  router.push('/');
                }}
                className="ml-4 text-sm text-gray-500 underline hover:text-gray-700"
              >
                条件をリセット
              </button>
    )
}