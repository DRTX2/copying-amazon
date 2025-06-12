type Props = {
  img: string;
  altImg: string;
};

const ProductImage = ({ img, altImg }: Props) => (
  <div className="w-full">
    <img src={`../${img}`} alt={altImg} className="w-full rounded shadow-md" />
  </div>
);

export default ProductImage;
