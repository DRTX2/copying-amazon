'use client';

import { useState } from 'react';
import { Heart, Loader2 } from 'lucide-react';
import { useFavorites, useAddFavorite, useRemoveFavorite } from '@/features/favorites/hooks/useFavorites';
import { useAuth } from '@/shared/stores/auth.store';
import { useRouter } from 'next/navigation';

interface FavoriteButtonProps {
  productId: number;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'icon' | 'button';
}

export default function FavoriteButton({ 
  productId, 
  className = '', 
  size = 'md',
  variant = 'icon'
}: FavoriteButtonProps) {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const { data: favorites = [] } = useFavorites();
  const addFavorite = useAddFavorite();
  const removeFavorite = useRemoveFavorite();
  const [isAnimating, setIsAnimating] = useState(false);

  const isFavorite = favorites.some(p => p.id === productId);
  const isLoading = addFavorite.isPending || removeFavorite.isPending;

  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
  };

  const buttonSizeClasses = {
    sm: 'p-1.5',
    md: 'p-2',
    lg: 'p-2.5',
  };

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      router.push('/auth/login');
      return;
    }

    setIsAnimating(true);
    
    try {
      if (isFavorite) {
        await removeFavorite.mutateAsync(productId);
      } else {
        await addFavorite.mutateAsync(productId);
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    } finally {
      setTimeout(() => setIsAnimating(false), 300);
    }
  };

  if (variant === 'button') {
    return (
      <button
        onClick={handleClick}
        disabled={isLoading}
        className={`
          flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all
          ${isFavorite 
            ? 'bg-red-50 text-red-600 hover:bg-red-100 border border-red-200' 
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
          }
          disabled:opacity-50
          ${className}
        `}
      >
        {isLoading ? (
          <Loader2 className={`${sizeClasses[size]} animate-spin`} />
        ) : (
          <Heart 
            className={`
              ${sizeClasses[size]} 
              ${isFavorite ? 'fill-red-500 text-red-500' : ''}
              ${isAnimating ? 'animate-[heartBeat_0.3s_ease-in-out]' : ''}
            `} 
          />
        )}
        {isFavorite ? 'Guardado' : 'Guardar'}
      </button>
    );
  }

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className={`
        ${buttonSizeClasses[size]}
        rounded-full transition-all duration-200
        ${isFavorite 
          ? 'bg-red-50 hover:bg-red-100' 
          : 'bg-white/90 hover:bg-white shadow-sm'
        }
        disabled:opacity-50
        ${className}
      `}
      title={isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
    >
      {isLoading ? (
        <Loader2 className={`${sizeClasses[size]} text-red-500 animate-spin`} />
      ) : (
        <Heart 
          className={`
            ${sizeClasses[size]} 
            transition-all duration-200
            ${isFavorite 
              ? 'fill-red-500 text-red-500' 
              : 'text-gray-400 hover:text-red-400'
            }
            ${isAnimating ? 'scale-125' : 'scale-100'}
          `} 
        />
      )}
    </button>
  );
}
