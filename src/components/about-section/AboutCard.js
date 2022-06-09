import profilePhoto from "../../media/profile-photo.jpg"
export default function AboutCard() {
  return (
    <div className="w-full h-fit p-1 m-auto sm:p-24 max-h-fit relative">
      <div className="py-8 px-8 max-w-fit mx-auto rounded-xl space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6">
        <img className="block mx-auto h-32 rounded-full sm:mx-0 sm:shrink-0" src={profilePhoto} alt="Profile face" />
        <div className="text-center sm:text-left">
          <div className="w-auto">
            <p className="text-lime-50 font-normal font-mono mb-1 overflow-y-auto">
              I'am Edenys Deniz González, a Computer Scientist from <b>Universidad Central Marta Abreu de las Villas</b> based in Santa Clara, Cuba.
            </p>
            <p className="text-lime-50 font-normal font-mono mb-1 overflow-y-auto">
              Specialized in Reactjs client-side rendering optimization.
              With a career in competitive programming of more than eight years.
            </p>
            <p className="text-lime-50 font-normal font-mono mb-1 overflow-y-auto">
              My free time is usually spent with family and friends, or reading something on the internet.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}