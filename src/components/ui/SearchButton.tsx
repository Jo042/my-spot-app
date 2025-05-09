'use client'

import { aborted } from "util";

type Props = {
    label?: string;
    onClick: () => void;
};

export default function SerachButton({ label = 'この条件で探す', onClick }: Props){
    return(
        <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        {label}
      </button>
    );
}