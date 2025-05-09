export type Spot = {
    id: string;
    name: string;
    area: string;
    genres: string[];
    type: 'indoor' | 'outdoor';
};

export const spots: Spot[] = [
    {
        id: '1',
        name: '新宿カフェタイム',
        area: 'shinjuku',
        genres: ['カフェ'],
        type: 'indoor',
    },
    {
      id: '2',
      name: '池袋の森公園',
      area: 'ikebukuro',
      genres: ['公園'],
      type: 'outdoor',
    },
    {
      id: '3',
      name: '横浜水族館',
      area: 'yokohama',
      genres: ['水族館'],
      type: 'indoor',
    },
    {
      id: '4',
      name: '池袋アートミュージアム',
      area: 'ikebukuro',
      genres: ['美術館'],
      type: 'indoor',
    },
];

