export default function Button ({ icon, text, onButtonClick }) {
  return (
    <button
        className="inline-flex items-center justify-center space-x-2 bg-gray-200 hover:bg-gray-500 text-gray-900 font-bold py-2 px-4 rounded"
        onClick={onButtonClick}>
      { icon }
      <span>{ text }</span>
  </button>
  )
}