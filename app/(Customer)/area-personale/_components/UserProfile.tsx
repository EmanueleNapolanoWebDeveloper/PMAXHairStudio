import { Calendar, Clock, User, Phone, Mail, CheckCircle, XCircle, AlertCircle, Plus, Filter } from 'lucide-react';


const UserProfile = ({ profile }) => {
    
  const getRoleColor = (role) => {
    switch(role) {
      case 'admin': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'employee': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'customer': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getRoleText = (role) => {
    switch(role) {
      case 'customer': return 'Cliente';
      case 'employee': return 'Dipendente';
      case 'admin': return 'Amministratore';
      default: return role;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center gap-6 mb-8">
        <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
          <User className="w-10 h-10 text-white" />
        </div>
        <div className="flex-1">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            {profile.name} {profile.surname}
          </h2>
          <div className="flex items-center gap-3">
            <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getRoleColor(profile.role)}`}>
              {getRoleText(profile.role)}
            </span>
            {!profile.reg_complete && (
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800 border border-yellow-200">
                Profilo incompleto
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
          <div className="p-2 bg-white rounded-lg shadow-sm">
            <Mail className="w-5 h-5 text-gray-500" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-600">Email</p>
            <p className="text-gray-800 font-medium">{profile.email}</p>
          </div>
        </div>
        
        {profile.phone && (
          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="p-2 bg-white rounded-lg shadow-sm">
              <Phone className="w-5 h-5 text-gray-500" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-600">Telefono</p>
              <p className="text-gray-800 font-medium">{profile.phone}</p>
            </div>
          </div>
        )}
        
        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
          <div className="p-2 bg-white rounded-lg shadow-sm">
            <Calendar className="w-5 h-5 text-gray-500" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-600">Membro dal</p>
            <p className="text-gray-800 font-medium">
              {new Date(profile.created_at).toLocaleDateString('it-IT', {
                year: 'numeric',
                month: 'long', 
                day: 'numeric'
              })}
            </p>
          </div>
        </div>
      </div>

      {!profile.reg_complete && (
        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
            <div>
              <p className="font-medium text-yellow-800 mb-1">
                Completa il tuo profilo
              </p>
              <p className="text-sm text-yellow-700">
                Aggiungi le informazioni mancanti per accedere a tutte le funzionalità disponibili.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;