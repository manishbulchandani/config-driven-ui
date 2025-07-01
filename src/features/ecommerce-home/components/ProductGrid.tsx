import React from 'react';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  rating: number;
}

interface ProductGridProps {
  products?: Product[];
  columns?: number;
  showFilters?: boolean;
  title?: string;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products = [],
  columns = 4,
  showFilters = true,
  title = 'Featured Products'
}) => {
  return (
    <div className="py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">{title}</h2>
        
        {showFilters && (
          <div className="flex justify-center mb-6 space-x-4">
            <button className="px-4 py-2 bg-blue-600 text-white rounded">All</button>
            <button className="px-4 py-2 bg-gray-200 rounded">Electronics</button>
            <button className="px-4 py-2 bg-gray-200 rounded">Clothing</button>
            <button className="px-4 py-2 bg-gray-200 rounded">Home</button>
          </div>
        )}
        
        <div 
          className="grid gap-6"
          style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
        >
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-green-600">${product.price}</span>
                  <div className="flex items-center">
                    <span className="text-yellow-500">⭐</span>
                    <span className="ml-1 text-sm text-gray-600">{product.rating}</span>
                  </div>
                </div>
                <button className="w-full mt-3 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};