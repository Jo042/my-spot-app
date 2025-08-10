'use client'

type Props = {
    label?: string;
    onClick: () => void;
};

export default function SearchButton({ label = 'この条件で探す' }: Props){
    return(
        <button
        type="submit"
        className="w-full bg-primary hover:bg-primary_hovered text-white font-semibold rounded-xl py-3 text-center"
      >
        {label}
      </button>
    );
}