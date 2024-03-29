import ContactmeCard from "./ContactmeCard";

const ContactmeSection = () => {
  return (
    <div
      className="flex dynamic-h-screen min-dynamic-h-screen bg-gray-900 flex-col w-full"
      id="contactme-section"
    >
      <p className="mt-16 sm:mt-32 text-cyan-200 text-6xl sm:text-7xl font-serif">
        Contact Me
      </p>
      <div className="w-full h-full p-3">
        <ContactmeCard />
      </div>
    </div>
  );
};

export default ContactmeSection;
