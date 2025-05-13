import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from '../../lib/supabase'

export type Spot = {
    id: string;
    name: string;
    area: string;
    genre: string[];
    type: 'indoor' | 'outdoor';
    image_url: string;
    description: string;
    address: string;
    openHours: string;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Spot[] | { error: string }>
){
    const { area , genre, type} = req.query;

    let query = supabase.from("spots").select("*");

    if(area && typeof area === "string"){
        query = query.ilike("area", `%${area}%`);
    }
    if (type && typeof type === "string") {
        query = query.eq("type", type);
    }

    if (genre) {
        if (Array.isArray(genre)) {
          query = query.overlaps("genre", genre);
        } else if (typeof genre === "string") {
          query = query.contains("genre", [genre]);
        }
    }

    const { data, error } = await query;

    if (error) {
     return res.status(500).json({ error: error.message });
    }

    return res.status(200).json(data || []);
}