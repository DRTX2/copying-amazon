type Link = {
  name: string;
  link: string;
};

type ShowInfoCardData = {
  name: string;
  title: string;
  content: string;
  moreLinks?: Link[];
};

const ShowInfoCard = ({ ...data }: ShowInfoCardData) => {
  return (
    <div className="space-y-2">
      <p className="text-sm font-medium text-gray-700">{data.name}</p>
      <section className="hidden">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{data.title}</h3>
        <p className="text-sm text-gray-600 mb-3">{data.content}</p>
        {data.moreLinks &&
          data.moreLinks.map((el, index) => (
            <a 
              key={index} 
              href={el.link}
              className="block text-blue-600 hover:text-blue-800 hover:underline text-sm mb-1 transition-colors"
            >
              {el.name}
            </a>
          ))}
      </section>
    </div>
  );
};

export default ShowInfoCard;
