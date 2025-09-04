import React, { useState } from 'react';
import { Search, X } from 'lucide-react';

const SearchBar = ({ 
  placeholder = "Inserisci nome cliente...", 
  onSearch, 
  onClear,
  className = "",
  disabled = false 
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    // Chiamata in tempo reale durante la digitazione
    if (onSearch) {
      onSearch(value);
    }
  };

  const handleClear = () => {
    setSearchTerm('');
    if (onClear) {
      onClear();
    }
    if (onSearch) {
      onSearch('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (onSearch) {
        onSearch(searchTerm);
      }
    }
  };

  return (
    <div className={`relative w-full max-w-md ${className}`}>
      <div className="relative">
        <div className="relative flex items-center">
          {/* Icona di ricerca a sinistra */}
          <Search 
            className="absolute left-3 h-4 w-4 text-gray-400 pointer-events-none" 
          />
          
          {/* Input di ricerca */}
          <input
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled}
            className={`
              w-full pl-10 pr-10 py-2 
              border border-gray-300 rounded-lg 
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
              disabled:bg-gray-100 disabled:cursor-not-allowed
              placeholder-gray-400 text-gray-900
              transition-colors duration-200
            `}
          />
          
          {/* Pulsante per cancellare */}
          {searchTerm && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-3 p-0.5 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Cancella ricerca"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// Componente di esempio che mostra come usare la SearchBar
const CustomerSearchBar = () => {
  const [isGuestBooking, setIsGuestBooking] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  
  // Dati di esempio


  const handleSearch = (searchTerm) => {
    if (searchTerm.trim() === '') {
      setSearchResults([]);
      return;
    }

    const filtered = mockData.filter(item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    setSearchResults(filtered);
  };

  const handleClear = () => {
    setSearchResults([]);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">Cerca cliente</h2>
        

        {/* SearchBar mostrata solo quando NON è guest booking */}
          <div className="w-96">
            <SearchBar 
              placeholder="Inserisci nome del cliente..." 
              onSearch={handleSearch}
              onClear={handleClear}
              className="mb-4"
            />
          </div>

        {/* Risultati della ricerca */}
        {searchResults.length > 0 && (
          <div className="space-y-2">
            <h3 className="font-semibold text-lg">Risultati:</h3>
            {searchResults.map(item => (
              <div key={item.id} className="p-3 border rounded-lg hover:bg-gray-50">
                <h4 className="font-medium">{item.name}</h4>
                <p className="text-gray-600 text-sm">{item.location}</p>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default CustomerSearchBar;