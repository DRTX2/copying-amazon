type Props = {
  img: string;
  altImg: string;
};

const ProductImage = ({ img, altImg }: Props) => (
  <div className="w-full">
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img 
        src={`../${img}`} 
        alt={altImg} 
        className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300" 
      />
    </div>
  </div>
);

export default ProductImage;
