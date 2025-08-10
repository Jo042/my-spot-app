'use client'

type Props = {
    detail: string[];
    selectedDetail: string[];
    //onToggle: (detal: string) => void;
    onOpenModal: () => void;
};

export default function DetailButton (
  { 
    onOpenModal,
  }: Props
) {
   return(
    <button
    type="button"
    className="flex items-center text-primary text-sm"
    onClick={onOpenModal}
  >
    <div className="w-8 h-8 rounded-full border border-primary text-primary flex items-center justify-center mr-2">
      <span className="text-sm">絞</span>
    </div>
    こだわり条件
  </button>
   ) 
}