import Image from "next/image";

type CardProps = {
  title: string;
  img: string;
  altImg: string;
  onClick: () => void;
};

export const Card: React.FC<CardProps> = ({ title, img, altImg, onClick }) => {
  return (
    <figure 
      className="flex flex-col justify-center items-center bg-gray-100 p-4 shadow-md text-center cursor-pointer hover:shadow-lg transition-shadow rounded-lg"
      onClick={onClick}
    >
      <div className="w-full h-48 mb-3 overflow-hidden rounded-md flex items-center justify-center bg-white relative">
        <Image 
          src={img} 
          alt={altImg} 
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-contain hover:scale-105 transition-transform duration-300"
        />
      </div>
      <figcaption className="text-sm font-medium text-gray-800 line-clamp-2">
        {title}
      </figcaption>
    </figure>
  );
};
