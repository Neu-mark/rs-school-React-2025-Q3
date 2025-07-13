import React, { Component } from 'react';

class Loader extends Component {
  override render(): React.ReactNode {
    return (
      <div className="card max-w-2xl mx-auto">
        <div className="flex flex-col items-center justify-center py-12">
          <div className="relative mb-6">
            <div className="w-16 h-16 rounded-full border-4 border-pokemon-primary border-t-transparent animate-spin"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-pokemon-primary animate-pulse"></div>
          </div>

          <h3 className="text-lg font-semibold text-pokemon-primary mb-2">
            Searching for Pokémon...
          </h3>

          <div className="flex space-x-1">
            <div className="w-2 h-2 rounded-full bg-pokemon-primary animate-bounce"></div>
            <div
              className="w-2 h-2 rounded-full bg-pokemon-primary animate-bounce"
              style={{ animationDelay: '0.1s' }}
            ></div>
            <div
              className="w-2 h-2 rounded-full bg-pokemon-primary animate-bounce"
              style={{ animationDelay: '0.2s' }}
            ></div>
          </div>

          <p className="text-gray-600 mt-4 text-center">
            Please wait while we fetch Pokémon data...
          </p>
        </div>
      </div>
    );
  }
}

export default Loader;
