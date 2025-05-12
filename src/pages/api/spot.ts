import type { NextApiRequest, NextApiResponse } from "next";
import { spots, Spot } from '../../lib/spots';

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Spot[]>
){
    const { area , genre, type} = req.query;

    const filtered = spots.filter((spot) => {
        const matchesArea =
          !area || spot.area === area;
        
        const matchesGenre =
          !genre || (Array.isArray(genre)
            ? genre.some((g) => spot.genres.includes(g))
            : spot.genres.includes(genre));
        
        const matchesType =
          !type || spot.type === type;

        return matchesArea && matchesGenre && matchesType;
    })
    res.status(200).json(filtered);
}