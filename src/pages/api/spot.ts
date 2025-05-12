import type { NextApiRequest, NextApiResponse } from "next";
import { spots } from '../../lib/spots';
import { Spot } from '../../lib/spots';

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Spot[]>
){
    res.status(200).json(spots);
}