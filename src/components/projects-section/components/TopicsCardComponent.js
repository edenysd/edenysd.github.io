import TopicItemCardComponent from "./TopicItemCardComponent";

const TopicsCardComponent = ({ topics }) => {
  return (
    <div className={"flex flex-col h-auto pb-3 w-full font-mono text-xl"}>
      <p className="font-semibold">Topics</p>
      <div className={"flex flex-row flex-wrap h-auto "}>
        {topics?.names.map((topic) => (
          <TopicItemCardComponent key={topic} topic={topic} />
        ))}
      </div>
    </div>
  );
};

export default TopicsCardComponent;
