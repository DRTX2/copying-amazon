import Image from "next/image";

type Props = {
  img: string;
  altImg: string;
};

const ProductImage = ({ img, altImg }: Props) => {
  // Limpiar la ruta si comienza con ./ o similar
  const cleanImgPath = img.replace(/^\.?\//, '/');

  return (
    <div className="w-full">
      <div className="bg-white rounded-lg shadow-md overflow-hidden relative min-h-[400px]">
        <Image 
          src={cleanImgPath} 
          alt={altImg} 
          fill
          priority
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-contain hover:scale-105 transition-transform duration-300"
        />
      </div>
    </div>
  );
};

export default ProductImage;
