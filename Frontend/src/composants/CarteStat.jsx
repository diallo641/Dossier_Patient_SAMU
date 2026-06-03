export default function CarteStat({ titre, valeur }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-5 flex-1 border border-gray-100 hover:shadow-lg transition">
      
      <h4 className="text-gray-500 text-sm font-medium">
        {titre}
      </h4>

      <h2 className="text-2xl font-bold text-gray-800 mt-2">
        {valeur}
      </h2>
    </div>
  );
}