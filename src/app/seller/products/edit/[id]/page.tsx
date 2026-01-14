'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useQuery } from '@tanstack/react-query';
import {
  Package,
  DollarSign,
  FileText,
  Tag,
  Save,
  ArrowLeft,
  Loader2,
  AlertCircle,
  Hash,
  Layers,
} from 'lucide-react';
import ImageUpload from '@/components/ImageUpload';
import { productService } from '@/services/product.service';
import { PRODUCT_IMAGE_CONFIG } from '@/config/imageUpload';
import { useSellerGuard } from '@/hooks/useSellerGuard';
import { useSellerProduct, useUpdateProduct } from '@/features/seller/hooks/useSellerProducts';
import { api } from '@/config/axios';
import Template from '@/layouts/Template';

const updateProductSchema = z.object({
  name: z.string().min(3, 'El nombre debe tener al menos 3 caracteres'),
  description: z.string().min(10, 'La descripción debe tener al menos 10 caracteres'),
  price: z.number().min(0.01, 'El precio debe ser mayor a 0'),
  categoryId: z.number().min(1, 'Debes seleccionar una categoría'),
  averageRating: z.number().min(0).max(5),
  sku: z.string().optional(),
  stockQuantity: z.number().min(0, 'El stock no puede ser negativo').optional(),
  status: z.enum(['ACTIVE', 'INACTIVE', 'PENDING', 'ARCHIVED']).optional(),
});

type UpdateProductFormData = z.infer<typeof updateProductSchema>;

interface ImageFile {
  file: File;
  preview: string;
  id: string;
}

interface Category {
  id: number;
  name: string;
  description?: string;
}

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const productId = Number(params.id);
  const { isSeller } = useSellerGuard();
  
  const [newImages, setNewImages] = useState<ImageFile[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const { data: product, isLoading: loadingProduct } = useSellerProduct(productId);
  const updateProductMutation = useUpdateProduct();

  const { data: categories = [], isLoading: loadingCategories } = useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data } = await api.get('/categories');
      return data;
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UpdateProductFormData>({
    resolver: zodResolver(updateProductSchema),
    defaultValues: {
      averageRating: 0,
      stockQuantity: 0,
      status: 'ACTIVE',
    },
  });

  // Cargar datos del producto
  useEffect(() => {
    if (product) {
      reset({
        name: product.name,
        description: product.description,
        price: product.price,
        categoryId: product.category?.id,
        averageRating: product.averageRating || 0,
      });
      setExistingImages(product.images || []);
    }
  }, [product, reset]);

  if (!isSeller) {
    return null;
  }

  const onSubmit = async (data: UpdateProductFormData) => {
    setUploadError(null);

    const totalImages = existingImages.length + newImages.length;
    if (totalImages === 0) {
      setUploadError('Debes tener al menos 1 imagen del producto');
      return;
    }

    try {
      let imageUrls = [...existingImages];

      // Subir nuevas imágenes si las hay
      if (newImages.length > 0) {
        const newImageUrls = await productService.uploadProductImages(
          newImages.map((img) => img.file)
        );
        imageUrls = [...imageUrls, ...newImageUrls];
      }

      await updateProductMutation.mutateAsync({
        id: productId,
        product: {
          ...data,
          images: imageUrls,
        },
      });

      router.push('/seller/products');
    } catch (error: any) {
      setUploadError(
        error.response?.data?.message ||
        error.message ||
        'Error al actualizar el producto'
      );
    }
  };

  const removeExistingImage = (index: number) => {
    setExistingImages((prev) => prev.filter((_, i) => i !== index));
  };

  const isSubmitting = updateProductMutation.isPending;
  const remainingSlots = PRODUCT_IMAGE_CONFIG.limits.maxFilesCount - existingImages.length;

  if (loadingProduct) {
    return (
      <Template>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-12 w-12 text-amber-500 animate-spin mx-auto mb-4" />
            <p className="text-gray-600">Cargando producto...</p>
          </div>
        </div>
      </Template>
    );
  }

  if (!product) {
    return (
      <Template>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 flex items-center justify-center">
          <div className="text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Producto no encontrado</h2>
            <p className="text-gray-600 mb-6">El producto que buscas no existe o fue eliminado.</p>
            <Link
              href="/seller/products"
              className="inline-flex items-center gap-2 px-6 py-3 bg-amber-400 hover:bg-amber-500 text-gray-900 font-semibold rounded-xl transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              Volver a Productos
            </Link>
          </div>
        </div>
      </Template>
    );
  }

  return (
    <Template>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          {/* Header */}
          <div className="mb-6">
            <Link
              href="/seller/products"
              className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-4 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Volver a Productos
            </Link>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl text-white">
                <Package className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Editar Producto</h1>
                <p className="text-gray-600">Modifica la información de tu producto</p>
              </div>
            </div>
          </div>

          {/* Formulario */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Información básica */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <FileText className="h-5 w-5 text-amber-500" />
                Información del Producto
              </h2>

              <div className="space-y-4">
                {/* Nombre */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Nombre del producto <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    {...register('name')}
                    className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 transition-all ${
                      errors.name
                        ? 'border-red-400 focus:ring-red-500/20'
                        : 'border-gray-200 focus:ring-amber-500/20 focus:border-amber-500'
                    }`}
                    placeholder="Ej: Laptop HP Pavilion 15.6''"
                    disabled={isSubmitting}
                  />
                  {errors.name && (
                    <p className="text-red-600 text-xs mt-1.5 flex items-center gap-1">
                      <AlertCircle className="h-3.5 w-3.5" />
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Descripción */}
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Descripción <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="description"
                    {...register('description')}
                    rows={4}
                    className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 resize-none transition-all ${
                      errors.description
                        ? 'border-red-400 focus:ring-red-500/20'
                        : 'border-gray-200 focus:ring-amber-500/20 focus:border-amber-500'
                    }`}
                    placeholder="Describe las características principales de tu producto..."
                    disabled={isSubmitting}
                  />
                  {errors.description && (
                    <p className="text-red-600 text-xs mt-1.5 flex items-center gap-1">
                      <AlertCircle className="h-3.5 w-3.5" />
                      {errors.description.message}
                    </p>
                  )}
                </div>

                {/* Precio y Categoría */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1.5">
                      Precio (USD) <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        id="price"
                        type="number"
                        step="0.01"
                        {...register('price', { valueAsNumber: true })}
                        className={`w-full border rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 transition-all ${
                          errors.price
                            ? 'border-red-400 focus:ring-red-500/20'
                            : 'border-gray-200 focus:ring-amber-500/20 focus:border-amber-500'
                        }`}
                        placeholder="0.00"
                        disabled={isSubmitting}
                      />
                    </div>
                    {errors.price && (
                      <p className="text-red-600 text-xs mt-1.5 flex items-center gap-1">
                        <AlertCircle className="h-3.5 w-3.5" />
                        {errors.price.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700 mb-1.5">
                      Categoría <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <select
                        id="categoryId"
                        {...register('categoryId', { valueAsNumber: true })}
                        className={`w-full border rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 appearance-none transition-all ${
                          errors.categoryId
                            ? 'border-red-400 focus:ring-red-500/20'
                            : 'border-gray-200 focus:ring-amber-500/20 focus:border-amber-500'
                        }`}
                        disabled={isSubmitting || loadingCategories}
                      >
                        <option value="">Selecciona una categoría</option>
                        {categories.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    {errors.categoryId && (
                      <p className="text-red-600 text-xs mt-1.5 flex items-center gap-1">
                        <AlertCircle className="h-3.5 w-3.5" />
                        {errors.categoryId.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Imágenes existentes */}
            {existingImages.length > 0 && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Layers className="h-5 w-5 text-amber-500" />
                  Imágenes Actuales
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                  {existingImages.map((url, index) => (
                    <div
                      key={index}
                      className="relative aspect-square rounded-xl overflow-hidden border-2 border-gray-200 group"
                    >
                      <img
                        src={url}
                        alt={`Imagen ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeExistingImage(index)}
                        disabled={isSubmitting}
                        className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 disabled:opacity-50"
                      >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Nuevas imágenes */}
            {remainingSlots > 0 && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <FileText className="h-5 w-5 text-amber-500" />
                  Agregar Nuevas Imágenes
                </h2>
                <ImageUpload
                  images={newImages}
                  onChange={setNewImages}
                  maxFiles={remainingSlots}
                  disabled={isSubmitting}
                />
              </div>
            )}

            {/* Error general */}
            {(uploadError || updateProductMutation.error) && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-700">
                  {uploadError || updateProductMutation.error?.message}
                </p>
              </div>
            )}

            {/* Botones de acción */}
            <div className="flex gap-4 justify-end">
              <Link
                href="/seller/products"
                className="px-6 py-3 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </Link>
              <button
                type="submit"
                disabled={isSubmitting || (existingImages.length === 0 && newImages.length === 0)}
                className="px-6 py-3 bg-gradient-to-r from-amber-400 to-orange-500 text-white font-semibold rounded-xl shadow-lg shadow-amber-200 hover:shadow-xl hover:shadow-amber-300 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Guardando...
                  </>
                ) : (
                  <>
                    <Save className="h-5 w-5" />
                    Guardar Cambios
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Template>
  );
}
