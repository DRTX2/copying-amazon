'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Package, DollarSign, FileText, Tag, Save, ArrowLeft } from 'lucide-react';
import ImageUpload from '@/components/ImageUpload';
import { productService } from '@/services/product.service';
import { PRODUCT_IMAGE_CONFIG } from '@/config/imageUpload';
import { useSellerGuard } from '@/hooks/useSellerGuard';
import { api } from '@/config/axios';

// Esquema de validación
const createProductSchema = z.object({
  name: z.string().min(3, 'El nombre debe tener al menos 3 caracteres'),
  description: z.string().min(10, 'La descripción debe tener al menos 10 caracteres'),
  price: z.number().min(0.01, 'El precio debe ser mayor a 0'),
  categoryId: z.number().min(1, 'Debes seleccionar una categoría'),
  averageRating: z.number().min(0).max(5),
});

type CreateProductFormData = z.infer<typeof createProductSchema>;

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

export default function CreateProductPage() {
  const router = useRouter();
  const { isSeller } = useSellerGuard();
  const [images, setImages] = useState<ImageFile[]>([]);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // No renderizar hasta verificar que es seller
  if (!isSeller) {
    return null;
  }

  // Obtener categorías
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
  } = useForm<CreateProductFormData>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      averageRating: 0,
    },
  });

  // Mutation para crear producto
  const createProductMutation = useMutation({
    mutationFn: async (data: CreateProductFormData & { images: string[] }) => {
      return await productService.createProduct(data);
    },
    onSuccess: () => {
      router.push('/profile?tab=products');
    },
  });

  const onSubmit = async (data: CreateProductFormData) => {
    setUploadError(null);

    // Validar que haya al menos 1 imagen
    if (images.length === 0) {
      setUploadError('Debes agregar al menos 1 imagen del producto');
      return;
    }

    try {
      // 1. Subir imágenes primero
      const imageUrls = await productService.uploadProductImages(
        images.map((img) => img.file)
      );

      // 2. Crear producto con las URLs de las imágenes
      await createProductMutation.mutateAsync({
        ...data,
        images: imageUrls,
      });
    } catch (error: any) {
      setUploadError(
        error.response?.data?.message || 
        error.message || 
        'Error al crear el producto'
      );
    }
  };

  const isSubmitting = createProductMutation.isPending;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800 mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver
          </button>
          <h1 className="text-2xl font-semibold text-gray-900">
            Crear Nuevo Producto
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Completa la información para publicar tu producto
          </p>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Información básica */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
              <Package className="h-5 w-5 text-yellow-600" />
              Información del Producto
            </h2>

            <div className="space-y-4">
              {/* Nombre */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre del producto <span className="text-red-500">*</span>
                </label>
                <input
                  id="name"
                  type="text"
                  {...register('name')}
                  className={`w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 ${
                    errors.name
                      ? 'border-red-400 focus:ring-red-500'
                      : 'border-gray-300 focus:ring-yellow-500'
                  }`}
                  placeholder="Ej: Laptop HP Pavilion 15.6''"
                  disabled={isSubmitting}
                />
                {errors.name && (
                  <p className="text-red-600 text-xs mt-1">{errors.name.message}</p>
                )}
              </div>

              {/* Descripción */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Descripción <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="description"
                  {...register('description')}
                  rows={4}
                  className={`w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 resize-none ${
                    errors.description
                      ? 'border-red-400 focus:ring-red-500'
                      : 'border-gray-300 focus:ring-yellow-500'
                  }`}
                  placeholder="Describe las características principales de tu producto..."
                  disabled={isSubmitting}
                />
                {errors.description && (
                  <p className="text-red-600 text-xs mt-1">{errors.description.message}</p>
                )}
              </div>

              {/* Precio y Categoría */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Precio */}
                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                    Precio (USD) <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      id="price"
                      type="number"
                      step="0.01"
                      {...register('price', { valueAsNumber: true })}
                      className={`w-full border rounded-md pl-10 pr-3 py-2 text-sm focus:outline-none focus:ring-2 ${
                        errors.price
                          ? 'border-red-400 focus:ring-red-500'
                          : 'border-gray-300 focus:ring-yellow-500'
                      }`}
                      placeholder="0.00"
                      disabled={isSubmitting}
                    />
                  </div>
                  {errors.price && (
                    <p className="text-red-600 text-xs mt-1">{errors.price.message}</p>
                  )}
                </div>

                {/* Categoría */}
                <div>
                  <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700 mb-1">
                    Categoría <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <select
                      id="categoryId"
                      {...register('categoryId', { valueAsNumber: true })}
                      className={`w-full border rounded-md pl-10 pr-3 py-2 text-sm focus:outline-none focus:ring-2 appearance-none ${
                        errors.categoryId
                          ? 'border-red-400 focus:ring-red-500'
                          : 'border-gray-300 focus:ring-yellow-500'
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
                    <p className="text-red-600 text-xs mt-1">{errors.categoryId.message}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Imágenes del producto */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
              <FileText className="h-5 w-5 text-yellow-600" />
              Imágenes del Producto
            </h2>

            <ImageUpload
              images={images}
              onChange={setImages}
              maxFiles={PRODUCT_IMAGE_CONFIG.limits.maxFilesCount}
              disabled={isSubmitting}
            />
          </div>

          {/* Error general */}
          {(uploadError || createProductMutation.error) && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-sm text-red-700">
                {uploadError || createProductMutation.error?.message}
              </p>
            </div>
          )}

          {/* Botones de acción */}
          <div className="flex gap-3 justify-end">
            <button
              type="button"
              onClick={() => router.back()}
              disabled={isSubmitting}
              className="px-6 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting || images.length === 0}
              className="px-6 py-2 bg-yellow-400 hover:bg-yellow-500 disabled:bg-yellow-300 text-gray-900 rounded-md text-sm font-medium flex items-center gap-2 disabled:cursor-not-allowed"
            >
              <Save className="h-4 w-4" />
              {isSubmitting ? 'Creando...' : 'Crear Producto'}
            </button>
          </div>
        </form>

        {/* Información adicional */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="text-sm font-medium text-blue-900 mb-2">
            📋 Consejos para una mejor publicación
          </h3>
          <ul className="text-xs text-blue-700 space-y-1">
            <li>• Usa un nombre descriptivo y claro para tu producto</li>
            <li>• Proporciona una descripción detallada con especificaciones técnicas</li>
            <li>• Agrega entre 3-5 imágenes de alta calidad desde diferentes ángulos</li>
            <li>• Verifica que el precio sea competitivo</li>
            <li>• Selecciona la categoría correcta para mayor visibilidad</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
