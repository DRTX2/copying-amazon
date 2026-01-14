'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Tags,
  Plus,
  Edit,
  Trash2,
  ArrowLeft,
  Save,
  X,
  Loader2,
  AlertCircle,
  FolderOpen,
} from 'lucide-react';
import Template from '@/layouts/Template';
import { useAdminGuard } from '@/features/auth/hooks/useAdminGuard';
import { 
  useCategories, 
  useCreateCategory, 
  useUpdateCategory, 
  useDeleteCategory 
} from '@/features/categories/hooks/useCategories';

const categorySchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  description: z.string().optional(),
});

type CategoryFormData = z.infer<typeof categorySchema>;

export default function AdminCategoriesPage() {
  const { isAdmin } = useAdminGuard();
  const { data: categories = [], isLoading } = useCategories();
  const createMutation = useCreateCategory();
  const updateMutation = useUpdateCategory();
  const deleteMutation = useDeleteCategory();

  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
  });

  const {
    register: registerEdit,
    handleSubmit: handleSubmitEdit,
    reset: resetEdit,
    formState: { errors: errorsEdit },
    setValue: setValueEdit,
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
  });

  if (!isAdmin) {
    return null;
  }

  const handleCreate = async (data: CategoryFormData) => {
    try {
      await createMutation.mutateAsync(data);
      reset();
      setIsCreating(false);
    } catch (error) {
      console.error('Error creating category:', error);
    }
  };

  const handleUpdate = async (data: CategoryFormData) => {
    if (editingId) {
      try {
        await updateMutation.mutateAsync({ id: editingId, category: data });
        resetEdit();
        setEditingId(null);
      } catch (error) {
        console.error('Error updating category:', error);
      }
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta categoría?')) {
      setDeletingId(id);
      try {
        await deleteMutation.mutateAsync(id);
      } finally {
        setDeletingId(null);
      }
    }
  };

  const startEditing = (category: { id: number; name: string; description?: string }) => {
    setEditingId(category.id);
    setValueEdit('name', category.name);
    setValueEdit('description', category.description || '');
  };

  return (
    <Template>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <Link
              href="/admin/users"
              className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-4 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Volver a Usuarios
            </Link>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl text-white">
                  <Tags className="h-6 w-6" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Categorías</h1>
                  <p className="text-gray-600">{categories.length} categorías registradas</p>
                </div>
              </div>
              {!isCreating && (
                <button
                  onClick={() => setIsCreating(true)}
                  className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-emerald-400 to-teal-500 text-white font-medium rounded-xl shadow-lg shadow-emerald-200 hover:shadow-xl transition-all"
                >
                  <Plus className="h-5 w-5" />
                  Nueva Categoría
                </button>
              )}
            </div>
          </div>

          {/* Create Form */}
          {isCreating && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Crear Nueva Categoría</h2>
              <form onSubmit={handleSubmit(handleCreate)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Nombre <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      {...register('name')}
                      className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 transition-all ${
                        errors.name
                          ? 'border-red-400 focus:ring-red-500/20'
                          : 'border-gray-200 focus:ring-emerald-500/20 focus:border-emerald-500'
                      }`}
                      placeholder="Nombre de la categoría"
                    />
                    {errors.name && (
                      <p className="text-red-600 text-xs mt-1">{errors.name.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Descripción
                    </label>
                    <input
                      type="text"
                      {...register('description')}
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                      placeholder="Descripción opcional"
                    />
                  </div>
                </div>
                <div className="flex gap-3 justify-end">
                  <button
                    type="button"
                    onClick={() => { reset(); setIsCreating(false); }}
                    className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={createMutation.isPending}
                    className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-lg transition-colors disabled:opacity-50"
                  >
                    {createMutation.isPending ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Save className="h-4 w-4" />
                    )}
                    Guardar
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Categories List */}
          {isLoading ? (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
              <Loader2 className="h-10 w-10 text-emerald-500 animate-spin mx-auto mb-4" />
              <p className="text-gray-500">Cargando categorías...</p>
            </div>
          ) : categories.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FolderOpen className="h-10 w-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No hay categorías</h3>
              <p className="text-gray-500 mb-6">Crea tu primera categoría para organizar los productos.</p>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-100">
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        ID
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Nombre
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Descripción
                      </th>
                      <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {categories.map((category) => (
                      <tr key={category.id} className="hover:bg-gray-50/50 transition-colors">
                        {editingId === category.id ? (
                          <td colSpan={4} className="px-6 py-4">
                            <form onSubmit={handleSubmitEdit(handleUpdate)} className="flex items-center gap-4">
                              <span className="text-sm font-medium text-gray-500">#{category.id}</span>
                              <input
                                type="text"
                                {...registerEdit('name')}
                                className={`flex-1 border rounded-lg px-3 py-2 text-sm ${
                                  errorsEdit.name ? 'border-red-400' : 'border-gray-200'
                                }`}
                                placeholder="Nombre"
                              />
                              <input
                                type="text"
                                {...registerEdit('description')}
                                className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm"
                                placeholder="Descripción"
                              />
                              <div className="flex gap-2">
                                <button
                                  type="submit"
                                  disabled={updateMutation.isPending}
                                  className="p-2 text-white bg-emerald-500 hover:bg-emerald-600 rounded-lg disabled:opacity-50"
                                >
                                  {updateMutation.isPending ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                  ) : (
                                    <Save className="h-4 w-4" />
                                  )}
                                </button>
                                <button
                                  type="button"
                                  onClick={() => { resetEdit(); setEditingId(null); }}
                                  className="p-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg"
                                >
                                  <X className="h-4 w-4" />
                                </button>
                              </div>
                            </form>
                          </td>
                        ) : (
                          <>
                            <td className="px-6 py-4">
                              <span className="text-sm font-medium text-gray-500">#{category.id}</span>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-lg flex items-center justify-center">
                                  <Tags className="h-5 w-5 text-emerald-600" />
                                </div>
                                <span className="font-medium text-gray-900">{category.name}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <span className="text-sm text-gray-600">
                                {category.description || '-'}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center justify-end gap-1">
                                <button
                                  onClick={() => startEditing(category)}
                                  className="p-2 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                                  title="Editar"
                                >
                                  <Edit className="h-5 w-5" />
                                </button>
                                <button
                                  onClick={() => handleDelete(category.id)}
                                  disabled={deletingId === category.id}
                                  className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                                  title="Eliminar"
                                >
                                  {deletingId === category.id ? (
                                    <Loader2 className="h-5 w-5 animate-spin text-red-600" />
                                  ) : (
                                    <Trash2 className="h-5 w-5" />
                                  )}
                                </button>
                              </div>
                            </td>
                          </>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </Template>
  );
}
