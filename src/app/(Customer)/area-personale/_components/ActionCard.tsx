import React from "react";

type ActionCardProps = {
  title: string;
  description: string;
  buttonText: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  gradient: string;
};

const ActionCard = ({ title, description, buttonText, icon: Icon, gradient }: ActionCardProps) => (
  <div className={`${gradient} rounded-lg shadow-md p-6 text-white hover:shadow-lg transition-shadow`}>
    <div className="flex items-start gap-4 mb-4">
      <div className="p-2 bg-white bg-opacity-20 rounded-lg">
        <Icon className="w-6 h-6" />
      </div>
      <div className="flex-1">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-white text-opacity-90 text-sm leading-relaxed">
          {description}
        </p>
      </div>
    </div>
    <button
      className="w-full bg-white bg-opacity-90 hover:bg-opacity-100 text-gray-800 font-semibold py-3 px-4 rounded-lg transition-all flex items-center justify-center gap-2 hover:shadow-md"
    >
      <Icon className="w-5 h-5" />
      {buttonText}
    </button>
  </div>
);

export default ActionCard;