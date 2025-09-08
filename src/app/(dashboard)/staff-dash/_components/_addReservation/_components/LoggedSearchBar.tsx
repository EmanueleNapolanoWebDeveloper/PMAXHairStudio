import React, { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { Profile } from '@/src/lib/types';

type SearchBarProps = {
  allProfiles: Profile[];
  selectedProfile: Profile | null;
  setSelectedProfile: (profile: Profile | null) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
};

const CustomerSearchBar: React.FC<SearchBarProps> = ({
  allProfiles,
  selectedProfile,
  setSelectedProfile,
  placeholder = "Inserisci nome cliente...",
  className = "",
  disabled = false
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProfiles, setFilteredProfiles] = useState<Profile[]>([]);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredProfiles([]);
      return;
    }

    const filtered = allProfiles.filter(profile =>
      `${profile.name} ${profile.surname} ${profile.phone}`.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredProfiles(filtered);
  }, [searchTerm, allProfiles]);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleClear = () => {
    setSearchTerm('');
    setFilteredProfiles([]);
    setSelectedProfile(null);
  };

  const handleSelect = (profile: Profile) => {
    setSelectedProfile(profile);
    setSearchTerm(``);
    setFilteredProfiles([]);
  };

  return (
    <div className={`relative w-full max-w-md ${className}`}>
      <div className="relative">
        <div className="relative flex items-center">
          {/* Icona di ricerca */}
          <Search className="absolute left-3 h-4 w-4 text-gray-400 pointer-events-none" />

          {/* Input di ricerca */}
          <input
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            placeholder={placeholder}
            disabled={disabled}
            className={`
              w-full pl-10 pr-10 py-2
              border border-gray-300 rounded-lg
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
              disabled:bg-gray-100 disabled:cursor-not-allowed
              placeholder-gray-400 text-black
              transition-colors duration-200
            `}
          />

          {/* Pulsante cancella */}
          {searchTerm && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-3 p-0.5 text-black hover:text-slate-800 transition-colors"
              aria-label="Cancella ricerca"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Dropdown risultati */}
        {filteredProfiles.length > 0 && (
          <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
            {filteredProfiles.map(profile => (
              <li
                key={profile.id}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-black"
                onClick={() => handleSelect(profile)}
              >
                <div className="flex flex-col">
                  <span className="font-medium">{profile.name} {profile.surname}</span>
                  {profile.phone && (
                    <span className="text-sm text-gray-500">{profile.phone}</span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Riepilogo utente selezionato */}
      {selectedProfile && (
        <div className="mt-4 p-4 border rounded-lg bg-gray-50 shadow-sm">
          <h3 className="font-semibold text-lg text-black">{selectedProfile.name} {selectedProfile.surname}</h3>
          {selectedProfile.email && <p className="text-gray-700">Email: {selectedProfile.email}</p>}
          {selectedProfile.phone && <p className="text-gray-700">Telefono: {selectedProfile.phone}</p>}
        </div>
      )}
    </div>
  );
};

export default CustomerSearchBar;
