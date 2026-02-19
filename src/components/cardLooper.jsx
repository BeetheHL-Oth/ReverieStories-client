import Card from "./card";

export default function CardLooper ({array}) {
  return (
    <>
      {array.map(e => (
        
        <Card 
          key={e.id} 
          title={e.title} 
          author={e.author} 
          chapters={e.chapters} 
          tags={e.Tags} 
          votes={e.votes} 
          id={e.id} 
        />

      ))}
    </>
  )
  
}