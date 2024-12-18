/* eslint-disable react/prop-types */

const CastCard = ({ person }) => (
  <div className="bg-white shadow-md rounded-lg overflow-hidden transform hover:scale-105 transition duration-300">
    <img
      src={
        person.profile_path
          ? `https://image.tmdb.org/t/p/w500${person.profile_path}`
          : `https://t4.ftcdn.net/jpg/02/34/12/57/360_F_234125704_SMg9xwLluzA4GLq46Vb5Cw9Pp0LNaUut.jpg`
      }
      alt={person.name}
      className="w-full h-[150px] object-cover"
    />
    <div className="p-2">
      <h3 className="text-sm font-bold text-slate-950 truncate">
        {person.name}
      </h3>
      <h3 className="text-sm italic font-bold text-slate-500 truncate">
        {person.character}
      </h3>
    </div>
  
  </div>
);

export default CastCard;
