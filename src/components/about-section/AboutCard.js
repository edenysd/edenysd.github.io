import profilePhoto from "../../media/sections/about-section/profile-photo.jpg"


export default function AboutCard() {
  return (
    <div className="w-full h-fit p-1 m-auto sm:px-24 max-h-fit relative">
      <div className="flex flex-col items-start py-8 px-8 max-w-fit mx-auto my-0 rounded-xl space-y-2 sm:py-4 sm:flex sm:flex-row sm:items-center sm:space-y-0 sm:space-x-6">
        <img className="block mx-auto h-32 rounded-full sm:mx-0 sm:shrink-0" src={profilePhoto} alt="Profile face" />
        <div className="text-center sm:text-left text-xl">
          <div className="w-auto">
            <p className="text-lime-50 font-normal font-mono mb-1 overflow-y-auto">
              I'm Edenys Deniz González, a computer scientist based in Santa Clara, Cuba.
            </p>
            <p className="text-lime-50 font-normal font-mono mb-1 overflow-y-auto">
              I have a career in competitive programming of more than eight years,
              I am currently working as a frontend developer.
            </p>
            <p className="text-lime-50 font-normal font-mono mb-1 overflow-y-auto">
              My free time is usually spent with family and friends, or reading something on the Internet.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}