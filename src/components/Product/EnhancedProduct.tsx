'use client';

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Star, 
  Heart, 
  Share2, 
  ShoppingCart, 
  Zap, 
  Truck, 
  Shield, 
  RotateCcw,
  Check,
  ChevronLeft,
  ChevronRight,
  Package,
  Loader2,
} from "lucide-react";
import { ProductData } from "@/types/products";
import { useCart } from "@/features/cart";
import { useAddFavorite, useRemoveFavorite, useFavorites } from "@/features/favorites/hooks/useFavorites";
import { useAuth } from "@/stores/auth.store";
import Message, { MessageData } from "@/components/Message/Message";
import SelectProduct from "./selectQuantityProduct";

interface EnhancedProductProps {
  product: ProductData;
  images?: string[];
  rating?: number;
  reviewCount?: number;
}

/**
 * Componente de producto mejorado con:
 * - Galería de imágenes con miniaturas
 * - Rating con estrellas
 * - Botón de favoritos
 * - Diseño premium
 * - Badges de envío y garantía
 */
export default function EnhancedProduct({ 
  product, 
  images = [],
  rating = 4.5,
  reviewCount = 128,
}: EnhancedProductProps) {
  const router = useRouter();
  const { addProductData } = useCart();
  const { isAuthenticated } = useAuth();
  const { data: favorites = [] } = useFavorites();
  const addFavorite = useAddFavorite();
  const removeFavorite = useRemoveFavorite();
  
  const quantityRef = useRef<HTMLSelectElement>(null);
  const [message, setMessage] = useState<MessageData | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  // Crear array de imágenes (usar la imagen del producto si no hay más)
  const productImages = images.length > 0 
    ? images 
    : [product.img, product.img, product.img]; // Placeholder

  const isFavorite = favorites.some(p => p.id === product.id);
  const isFavoriteLoading = addFavorite.isPending || removeFavorite.isPending;

  const handleToggleFavorite = async () => {
    if (!isAuthenticated) {
      router.push('/auth/login');
      return;
    }

    try {
      if (isFavorite) {
        await removeFavorite.mutateAsync(Number(product.id));
      } else {
        await addFavorite.mutateAsync(Number(product.id));
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  const handleAddToCart = (buyNow: boolean = false) => {
    const quantity = parseInt(quantityRef.current?.value || "1");
    
    if (product.cantidadDisponible < quantity) {
      setMessage({
        time: 20,
        title: "Stock insuficiente",
        content: "No hay suficiente stock disponible.",
        type: "dangerous",
      });
      return;
    }

    addProductData(product, quantity);
    
    setMessage({
      time: 20,
      title: "¡Agregado al carrito!",
      content: `${product.title} se ha agregado a tu carrito.`,
      type: "success",
    });

    if (buyNow) {
      router.push("/shopping-cart");
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.title,
          text: `Mira este producto: ${product.title}`,
          url: window.location.href,
        });
      } catch {
        // Cancel share is expected, no action needed
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      setMessage({
        time: 10,
        title: "¡Link copiado!",
        content: "El enlace del producto ha sido copiado al portapapeles.",
        type: "success",
      });
    }
  };

  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % productImages.length);
  };

  const prevImage = () => {
    setSelectedImageIndex((prev) => (prev - 1 + productImages.length) % productImages.length);
  };

  const discountedPrice = product.descuento > 0 
    ? product.precio * (1 - product.descuento / 100) 
    : product.precio;

  const cleanImgPath = (img: string) => img.replace(/^\.?\//, '/');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-amber-600 transition-colors">
          Inicio
        </Link>
        <span>/</span>
        {product.category.map((cat, index) => (
          <span key={index} className="flex items-center gap-2">
            <Link 
              href={`/category/${cat}`} 
              className="hover:text-amber-600 transition-colors"
            >
              {cat}
            </Link>
            {index < product.category.length - 1 && <span>/</span>}
          </span>
        ))}
      </nav>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* Image Gallery */}
        <div className="lg:col-span-5">
          <div className="sticky top-24 space-y-4">
            {/* Main Image */}
            <div 
              className="relative bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group"
              onMouseEnter={() => setIsZoomed(true)}
              onMouseLeave={() => setIsZoomed(false)}
            >
              <div className="aspect-square relative">
                <Image
                  src={cleanImgPath(productImages[selectedImageIndex])}
                  alt={product.altImg || product.title}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className={`object-contain transition-transform duration-500 ${
                    isZoomed ? 'scale-110' : 'scale-100'
                  }`}
                />
              </div>
              
              {/* Navigation arrows */}
              {productImages.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-white/90 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
                  >
                    <ChevronLeft className="h-5 w-5 text-gray-700" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-white/90 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
                  >
                    <ChevronRight className="h-5 w-5 text-gray-700" />
                  </button>
                </>
              )}

              {/* Discount badge */}
              {product.descuento > 0 && (
                <div className="absolute top-4 left-4 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                  -{product.descuento}%
                </div>
              )}

              {/* Action buttons */}
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                <button
                  onClick={handleToggleFavorite}
                  disabled={isFavoriteLoading}
                  className={`p-2.5 rounded-full shadow-md transition-all ${
                    isFavorite 
                      ? 'bg-red-50 hover:bg-red-100' 
                      : 'bg-white hover:bg-gray-50'
                  }`}
                >
                  {isFavoriteLoading ? (
                    <Loader2 className="h-5 w-5 text-red-500 animate-spin" />
                  ) : (
                    <Heart 
                      className={`h-5 w-5 ${
                        isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'
                      }`} 
                    />
                  )}
                </button>
                <button
                  onClick={handleShare}
                  className="p-2.5 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
                >
                  <Share2 className="h-5 w-5 text-gray-400" />
                </button>
              </div>
            </div>

            {/* Thumbnails */}
            {productImages.length > 1 && (
              <div className="flex gap-3 justify-center">
                {productImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImageIndex === index 
                        ? 'border-amber-500 ring-2 ring-amber-200' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Image
                      src={cleanImgPath(img)}
                      alt={`${product.title} - ${index + 1}`}
                      width={64}
                      height={64}
                      className="w-full h-full object-contain"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Product Info */}
        <div className="lg:col-span-4 space-y-6">
          {/* Title and Rating */}
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">
              {product.title}
            </h1>
            
            {/* Rating */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-5 w-5 ${
                      star <= Math.floor(rating)
                        ? 'fill-amber-400 text-amber-400'
                        : star <= rating
                        ? 'fill-amber-400/50 text-amber-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-amber-600 font-medium">{rating.toFixed(1)}</span>
              <span className="text-gray-400">|</span>
              <Link href="#reviews" className="text-blue-600 hover:underline text-sm">
                {reviewCount} opiniones
              </Link>
            </div>
          </div>

          {/* Price Section */}
          <div className="bg-gray-50 rounded-xl p-5 space-y-2">
            {product.descuento > 0 && (
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-500 line-through">
                  ${product.precio.toFixed(2)}
                </span>
                <span className="bg-red-100 text-red-700 text-xs font-semibold px-2 py-1 rounded">
                  Ahorras ${(product.precio - discountedPrice).toFixed(2)}
                </span>
              </div>
            )}
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-gray-900">
                ${discountedPrice.toFixed(2)}
              </span>
            </div>
            <p className="text-sm text-gray-500">
              Precio final. Incluye impuestos.
            </p>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Descripción del producto
            </h3>
            <ul className="space-y-2">
              {product.description.map((desc, i) => (
                <li key={i} className="flex items-start gap-2 text-gray-700">
                  <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>{desc}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Characteristics */}
          <div className="bg-white rounded-xl border border-gray-100 p-5">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Características
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              {product.marca && (
                <div>
                  <span className="text-gray-500">Marca</span>
                  <p className="font-medium text-gray-900">{product.marca}</p>
                </div>
              )}
              {product.color && (
                <div>
                  <span className="text-gray-500">Color</span>
                  <p className="font-medium text-gray-900">{product.color}</p>
                </div>
              )}
              {product.estilo && (
                <div>
                  <span className="text-gray-500">Estilo</span>
                  <p className="font-medium text-gray-900">{product.estilo}</p>
                </div>
              )}
              {product.usos.length > 0 && (
                <div className="col-span-2">
                  <span className="text-gray-500">Usos</span>
                  <p className="font-medium text-gray-900">{product.usos.join(', ')}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Buy Box */}
        <div className="lg:col-span-3">
          <div className="sticky top-24 bg-white rounded-2xl border border-gray-200 shadow-lg p-6 space-y-5">
            {/* Price */}
            <div>
              <p className="text-sm text-gray-500 mb-1">Precio:</p>
              <p className="text-3xl font-bold text-gray-900">
                ${discountedPrice.toFixed(2)}
              </p>
            </div>

            {/* Delivery info */}
            <div className="flex items-center gap-3 text-sm">
              <Truck className="h-5 w-5 text-green-600" />
              <div>
                <p className="font-medium text-green-600">Envío gratis</p>
                <p className="text-gray-500">Llega mañana</p>
              </div>
            </div>

            {/* Stock status */}
            {product.cantidadDisponible > 0 ? (
              <>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-green-600 font-medium">
                    En stock ({product.cantidadDisponible} disponibles)
                  </span>
                </div>

                {/* Quantity */}
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-2">
                    Cantidad
                  </label>
                  <SelectProduct 
                    quantity={product.cantidadDisponible} 
                    refInput={quantityRef} 
                  />
                </div>

                {/* Action buttons */}
                <div className="space-y-3">
                  <button
                    onClick={() => handleAddToCart(false)}
                    className="w-full flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-500 text-gray-900 font-semibold py-3.5 px-4 rounded-full transition-colors shadow-md hover:shadow-lg"
                  >
                    <ShoppingCart className="h-5 w-5" />
                    Agregar al carrito
                  </button>
                  <button
                    onClick={() => handleAddToCart(true)}
                    className="w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3.5 px-4 rounded-full transition-colors"
                  >
                    <Zap className="h-5 w-5" />
                    Comprar ahora
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center py-4">
                <div className="flex items-center justify-center gap-2 text-red-600 mb-3">
                  <Package className="h-5 w-5" />
                  <span className="font-medium">Agotado</span>
                </div>
                <button
                  onClick={handleToggleFavorite}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  Agregar a lista de deseos
                </button>
              </div>
            )}

            {/* Trust badges */}
            <div className="pt-4 border-t border-gray-100 space-y-3">
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Shield className="h-5 w-5 text-gray-400" />
                <span>Compra protegida</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <RotateCcw className="h-5 w-5 text-gray-400" />
                <span>30 días de devolución</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Truck className="h-5 w-5 text-gray-400" />
                <span>Enviado desde {product.origenEnvio || 'Local'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Back to catalog button */}
      <div className="mt-8 flex justify-center">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium transition-colors"
        >
          <ChevronLeft className="h-5 w-5" />
          Volver al catálogo
        </Link>
      </div>

      {message && (
        <Message
          time={message.time}
          title={message.title}
          content={message.content}
          type={message.type}
        />
      )}
    </div>
  );
}
