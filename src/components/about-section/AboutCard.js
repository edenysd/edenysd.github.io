import profilePhoto from "../../media/sections/about-section/profile-photo.jpg";

export default function AboutCard() {
  return (
    <div className="w-full h-fit p-1 m-auto sm:px-24 max-h-fit relative">
      <div className="flex flex-col sm:justify-center py-8 px-8  sm:p-0 mx-auto my-0 rounded-xl space-y-2 sm:py-4 sm:flex sm:flex-row sm:items-center sm:space-y-0 sm:space-x-6">
        <img
          className="block mx-auto h-44 rounded-full sm:mx-0 sm:shrink-0"
          src={profilePhoto}
          alt="Profile face"
        />
        <div className="text-left text-xl">
          <div className="flex flex-col w-auto font-mono text-lime-50 overflow-y-auto gap-4">
            <p className="sm:text-left text-center">
              <strong className="text-amber-300"> Computer Scientist</strong>
            </p>
            <p>
              <strong className="text-amber-300">5 years</strong> of experience
              working in frontend positions
            </p>
            <p>
              <strong className="text-amber-300"> 8 years</strong> career in
              competitive programming.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
