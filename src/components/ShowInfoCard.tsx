import "./ShowInfoCard.css"

type Link={
    name:string,
    link:string
}

type ShowInfoCardData={
    name:string,
    title:string,
    content:string,
    moreLinks?: Link[]
}

const ShowInfoCard = ({...data}:ShowInfoCardData) => {
  return (
    <>
        <p>{data.name}</p>
        <section className='cardData'>
            <h3>{data.title}</h3>
            <p>{data.content}</p>
            {
                data.moreLinks &&   data.moreLinks.map((el, index) =><a key={index}href={el.link}>{el.name}</a>)
            }
        </section>
    </>
  )
}

export default ShowInfoCard