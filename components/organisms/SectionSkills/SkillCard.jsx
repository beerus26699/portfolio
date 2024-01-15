const CardSkill = ({ skill }) => {
    return (
      <div
        className={
          "w-28 h-20 bg-gray-d1000 flex flex-col items-center p-2 rounded mr-4 " +
          skill.color
        }
      >
        <skill.icon className={"w-12 h-12"} />
        <p className="tracking-normal text-sm mt-1 text-white">{skill.name}</p>
      </div>
    );
  };
  
  export default CardSkill;
  