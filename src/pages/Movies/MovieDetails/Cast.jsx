/* eslint-disable react/prop-types */

import CastCard from "./CastCard";

const Cast = ({ cast }) => (
  <div className="max-w-screen-xl lg:max-w-7xl mt-10 mx-auto px-4">
    <h2 className="text-4xl text-slate-200 font-extrabold tracking-tight md:text-5xl lg:text-4xl mb-6">
      Reparto
    </h2> 
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {cast.length > 0 ? (
        cast.map((person) => (
          <div key={person.id} className="w-full max-w-[120px] mx-auto mb-4">
            <CastCard person={person} />
          </div>
        ))
      ) : (
        <p className="text-white">No hay personas disponibles.</p>
      )}
    </div>
  </div>
);

export default Cast;
