export type Spot = {
    id: string;
    name: string;
    area: string;
    genres: string[];
    type: 'indoor' | 'outdoor';
    imageUrl: string;
    description: string;
    address: string;
    openHours: string;
};

export const spots: Spot[] = [
    {
        id: '1',
        name: '新宿カフェタイム',
        area: 'shinjuku',
        genres: ['カフェ'],
        type: 'indoor',
        imageUrl: '/sample.png',
        description: '落ち着いた雰囲気のカフェでゆったり過ごせます。',
        address: '東京都新宿区〇〇1-2-3',
        openHours: '10:00〜20:00',
    },
    {
        id: '2',
        name: '池袋の森公園',
        area: 'ikebukuro',
        genres: ['公園'],
        type: 'outdoor',
        imageUrl: '/sample.png',
        description: '落ち着いた雰囲気のカフェでゆったり過ごせます。',
        address: '東京都新宿区〇〇1-2-3',
        openHours: '10:00〜20:00',
    },
    {
        id: '3',
        name: '横浜水族館',
        area: 'yokohama',
        genres: ['水族館'],
        type: 'indoor',
        imageUrl: '/sample.png',
        description: '落ち着いた雰囲気のカフェでゆったり過ごせます。',
        address: '東京都新宿区〇〇1-2-3',
        openHours: '10:00〜20:00',
    },
    {
        id: '4',
        name: '池袋アートミュージアム',
        area: 'ikebukuro',
        genres: ['美術館'],
        type: 'indoor',
        imageUrl: '/sample.png',
        description: '落ち着いた雰囲気のカフェでゆったり過ごせます。',
        address: '東京都新宿区〇〇1-2-3',
        openHours: '10:00〜20:00',
    },
];

