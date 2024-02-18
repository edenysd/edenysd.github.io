import profilePhoto from "../../media/sections/about-section/profile-photo.jpg";

export default function AboutCard() {
  return (
    <div className="w-full h-fit p-1 m-auto sm:px-24 max-h-fit relative pointer-events-none">
      <div
        className="w-fit flex flex-col md:justify-center py-8 px-8 md:p-8 mx-auto my-0 rounded-xl space-y-2 md:py-4
        md:flex-row md:items-center md:space-y-0 md:space-x-6 backdrop-blur-sm"
      >
        <img
          className="block mx-auto h-44 rounded-full md:mx-0 md:shrink-0"
          src={profilePhoto}
          alt="Profile face"
        />
        <div className="text-left text-xl pointer-events-auto">
          <div className="flex flex-col w-auto font-mono text-lime-50 overflow-y-auto gap-4 pl-2">
            <p className="md:text-left text-center">
              <span className="text-white font-semibold">
                Computer Scientist
              </span>
            </p>
            <p>
              <span className="text-lime-200 glow-5">5 years</span> of
              experience working in frontend positions
            </p>
            <p>
              <span className="text-lime-200 glow-5"> 8 years</span> career in
              competitive programming
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
