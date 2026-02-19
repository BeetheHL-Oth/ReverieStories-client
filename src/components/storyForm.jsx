export default function StoryForm ({type, formType, submit, story, setStory}) {
  return (
    <>
      <form onSubmit={submit}
        className="flex flex-col gap-1 justify-center text-xl text-slate-900 bg-stone-50 outline-1 outline-neutral-200 w-full p-20 rounded-2xl mx-10 shadow-xl "
      >

        <h1
          className="text-4xl text-center"
        ><b>{formType + ' ' + type}</b></h1>

        <br /><br />

        <input id="title"
          type="text"
          value={story.title}
          onChange={(e) => setStory({
            ...story, 
            title: e.target.value
          })}
          className="bg-white text-black py-3 text-5xl text-center"
          placeholder="Title"
        />

        <textarea id="description"
          rows="10"
          name="description"
          value={story.description}
          onChange={(e) => setStory({
            ...story,
            description: e.target.value
          })}
          className="bg-white text-black resize-none field-sizing- min-h-200 py-3 px-30 text-2xl"
          placeholder="Start typing here!"
        />
        <br />

        <label htmlFor="storyImageUrl"
          className=""
        >Image URL:</label>

        {type === 'Chapter' ? (<input id="chapterImageUrl"
          type="text"
          value={story.chapterImageUrl}
          onChange={(e) => setStory({
            ...story,
            chapterImageUrl: e.target.value
          })}
          className="outline-1 outline-neutral-200 p-3"
        />) : (<>
        <input id="storyImageUrl"
          type="text"
          value={story.storyImageUrl}
          onChange={(e) => setStory({
            ...story,
            storyImageUrl: e.target.value
          })}
          className="outline-1 outline-neutral-200 p-3"
        /></>)}

        <br /><br />

          <button type="submit"
            className="cursor-pointer bg-black text-white p-2 active:opacity-70"
          >Submit</button>
      </form>
    </>
  )
}