export default function WelcomeCard () {
  return (
    <>
      <div
        className="h-1/2"
      >

        <img
          className="flex justify-center items-center object-cover w-full h-full"
          src="https://media.istockphoto.com/id/2154133286/vector/book-festival-books-sale-back-to-school-concept-design-colorful-vector-design-and.jpg?s=612x612&w=0&k=20&c=d-9h6CPxTNHGmlCUwXJ64PCmRs4H25fTZ9XnpNNrRwM=" alt="buffering" 
        />

      </div>
      
      <div
        className="flex flex-col items-center justify-center p-16"
      >

        <h1
          className="text-7xl mb-5"
        ><b>Welcome to Reverie Stories!</b></h1>
        <p
          className="text-3xl underline mb-10"
        >Read books of all kind, or write your own together with your personal characters!</p>
        <p
          className="text-2xl"
        >Here in Reverie Stories we use AI to help and boost creativity, allowing you to chat to your characters brought to life! We do not allow any AI actually writing parts of the story but feel free to use them to potentially advance their lore!</p>

      </div>
    </>
  )
}