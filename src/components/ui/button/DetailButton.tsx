'use client'

type Props = {
    detail: string[];
    selectedDetail: string[];
    //onToggle: (detal: string) => void;
    onOpenModal: () => void;
};

export default function DetailButton (
  { detail, 
    onOpenModal, 
    selectedDetail, 
    //onToggle 
  }: Props
) {
   return(
    <button
    type="button"
    className="flex items-center text-blue-600 text-sm"
    onClick={onOpenModal}
  >
    <div className="w-8 h-8 rounded-full border border-blue-500 text-blue-500 flex items-center justify-center mr-2">
      <span className="text-sm">絞</span>
    </div>
    こだわり条件
  </button>
   ) 
}