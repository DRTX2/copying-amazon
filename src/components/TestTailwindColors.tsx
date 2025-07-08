// Componente de prueba para verificar clases Tailwind personalizadas
import React from 'react';

const TestTailwindColors = () => {
  return (
    <div className="p-4 space-y-4">
      <div className="bg-primary text-white p-4 rounded">
        Primary Color: rgb(19, 26, 34)
      </div>
      <div className="bg-secondary text-white p-4 rounded">
        Secondary Color: rgb(35, 47, 62)
      </div>
      <div className="bg-background text-primary p-4 rounded">
        Background Color: #eee
      </div>
      <div className="bg-dorade text-primary p-4 rounded">
        Dorade Color: rgb(255, 224, 147)
      </div>
      <div className="text-primary">
        Primary Text Color
      </div>
      <div className="text-secondary">
        Secondary Text Color
      </div>
    </div>
  );
};

export default TestTailwindColors;
