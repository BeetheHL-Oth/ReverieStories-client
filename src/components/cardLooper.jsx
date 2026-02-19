import { useLocation } from "react-router";
import Card from "./card";

export default function CardLooper ({array}) {
  const location = useLocation()
  return (
    <>
      {array.map(e => (
        
        <Card 
          key={e.id} 
          title={e.title} 
          author={e.author} 
          chapters={location.pathname === '/mystories' ? e.Chapters : e.chapters} 
          tags={e.Tags} 
          votes={e.votes} 
          id={e.id} 
        />

      ))}
    </>
  )
  
}