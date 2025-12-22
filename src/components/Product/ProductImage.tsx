import { pathRoute } from "../../utils/navigation";

type Props = {
  img: string;
  altImg: string;
};

const ProductImage = ({ img, altImg }: Props) => (
  <div className="w-full">
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img 
        src={`${pathRoute}${img}`} 
        alt={altImg} 
        className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300" 
        onError={() => {
          console.error('Image failed to load:', `${pathRoute}${img}`);
        }}
      />
    </div>
  </div>
);

export default ProductImage;
