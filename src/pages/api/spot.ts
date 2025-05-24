import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from '../../lib/supabase'

export type Spot = {
    id: string;
    name: string;
    area: string;
    genre: string[];
    type: 'indoor' | 'outdoor';
    detail: string[];
    image_url: string;
    description: string;
    address: string;
    openHours: string;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Spot[] | { error: string }>
){
    const { area , genre, type, detail} = req.query;

    let query = supabase.from("spots").select("*");

    if (area) {
     if (Array.isArray(area)) {
        query = query.in("area", area); // ✅ 複数対応
     } 
     else {
        query = query.eq("area", area); // ✅ 単一の場合
     }
    }


    if (type && typeof type === "string") {
        query = query.eq("type", type);
    }

    if (genre) {
        const genreArray = Array.isArray(genre) ? genre : [genre];
        query = query.overlaps("genre", genreArray); // ✅ 常に overlaps
    }    

if (detail) {
  const detailArray = Array.isArray(detail) ? detail : [detail];
  query = query.overlaps("detail", detailArray); // ✅ 常に overlaps
}


    const { data, error } = await query;

    if (error) {
     return res.status(500).json({ error: error.message });
    }

    return res.status(200).json(data || []);
}