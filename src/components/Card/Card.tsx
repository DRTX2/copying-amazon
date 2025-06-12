type CardProps = {
  title: string;
  img: string;
  altImg: string;
  onClick: () => void;
};

export const Card: React.FC<CardProps> = ({ title, img, altImg, onClick }) => {
  return (
    <figure className="card" onClick={onClick}>
      <img src={img} alt={altImg} />
      <figcaption>{title}</figcaption>
    </figure>
  );
};
