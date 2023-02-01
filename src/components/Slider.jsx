import React from "react";
import CardSlider from "./CardSlider";

export default React.memo(function Slider({ movies }) {
  const getMoviesFromRange = (from, to) => {
    return movies.slice(from, to);
  };
  return (
    <div>
      <CardSlider
        key="trending"
        title="Trending now"
        data={getMoviesFromRange(0, 10)}
      />
      <CardSlider
        key="new"
        title="New Release"
        data={getMoviesFromRange(10, 20)}
      />
      <CardSlider
        key="blockbuster"
        title="Blockbuster movies"
        data={getMoviesFromRange(20, 30)}
      />
      <CardSlider
        key="popular"
        title="Popular"
        data={getMoviesFromRange(30, 40)}
      />
      <CardSlider
        key="highrate"
        title="High rate Movies"
        data={getMoviesFromRange(40, 50)}
      />
      <CardSlider key="epic" title="Epics" data={getMoviesFromRange(50, 60)} />
    </div>
  );
});
