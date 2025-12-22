import { Metadata } from 'next';
import { productService } from '@/shared/services/product.service';
import ProductClient from './ProductClient';

interface Props {
  params: Promise<{ id: string }>;
}

/**
 * SEO: Generación de metadata dinámica para productos
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const productId = parseInt(id);
  
  try {
    const product = await productService.getProductById(productId);
    
    if (!product) {
      return {
        title: 'Producto no encontrado',
      };
    }

    const description = Array.isArray(product.description) 
      ? product.description.join(' ') 
      : product.description;

    return {
      title: `${product.title} | Amazon Clone`,
      description: description || `Compra ${product.title} al mejor precio en Amazon Clone.`,
      openGraph: {
        title: product.title,
        description: description,
        images: [
          {
            url: product.img,
            alt: product.altImg || product.title,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: product.title,
        description: description,
        images: [product.img],
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Producto | Amazon Clone',
    };
  }
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const productId = parseInt(id);

  return <ProductClient productId={productId} />;
}
