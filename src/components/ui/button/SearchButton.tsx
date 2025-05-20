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
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl py-3 text-center"
      >
        {label}
      </button>
    );
}