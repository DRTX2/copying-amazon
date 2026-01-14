import Image from "next/image";

const LanguageCurrencies = () => {
  return (
    <div className="w-full">
      {/* Línea superior que ocupa todo el ancho */}
      <div className="w-full border-t border-gray-600"></div>
      
      {/* Contenido de currencies */}
      <div className="w-full max-w-4xl mx-auto py-8">
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6">
          {/* Amazon Logo */}
          <div className="flex-shrink-0">
            <Image
              src="/assets/img/png-transparent-amazon-dark-hd-logo.png"
              alt="logo de amazon"
              width={128}
              height={36}
              className="h-9 w-auto max-w-32"
              style={{ width: 'auto' }}
            />
          </div>
          
          {/* Language Selector */}
          <div className="flex-shrink-0">
            <select 
              className="bg-gray-800 text-gray-300 border border-gray-600 rounded px-3 py-2 text-sm hover:border-yellow-400 hover:shadow-lg hover:shadow-yellow-400/20 focus:outline-none focus:border-yellow-400 transition-all duration-200"
              name="language" 
              id="language-user"
            >
              <option value="ES">Español - ES</option>
              <option value="EN">English - EN</option>
              <option value="PT">Portugues - PT</option>
              <option value="CH">Chinese - CH</option>
            </select>
          </div>
          
          {/* Currency Button */}
          <div className="flex-shrink-0">
            <button 
              className="bg-gray-800 text-gray-300 border border-gray-600 rounded px-3 py-2 text-sm hover:border-yellow-400 hover:shadow-lg hover:shadow-yellow-400/20 focus:outline-none focus:border-yellow-400 transition-all duration-200"
              id="money"
            >
              USD - Dólar
            </button>
          </div>
          
          {/* Nationality Button */}
          <div className="flex-shrink-0">
            <button 
              className="bg-gray-800 text-gray-300 border border-gray-600 rounded px-3 py-2 text-sm hover:border-yellow-400 hover:shadow-lg hover:shadow-yellow-400/20 focus:outline-none focus:border-yellow-400 transition-all duration-200"
              id="nationality"
            >
              Estados Unidos
            </button>
          </div>
        </div>
      </div>
      
      {/* Línea inferior que ocupa todo el ancho */}
      <div className="w-full border-b border-gray-600"></div>
    </div>
  );
};

export default LanguageCurrencies;
