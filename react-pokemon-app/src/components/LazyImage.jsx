import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

const Loading = ({ url, alt }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [opacity, setOpacity] = useState("opacity-0");

  useEffect(() => {
    isLoading ? setOpacity("opacity-0") : setOpacity("opacity-100");
  }, [isLoading]);

  return (
    <>
      {isLoading && (
        <div className="absolute h-full z-10 w-full flex items-center justify-center">
          <></>
        </div>
      )}
      <img
        src={url}
        alt={alt}
        width="100%"
        height="auto"
        loading="lazy"
        onLoad={() => setIsLoading(false)}
        className={`object-contain h-full ${opacity}`}
      />
    </>
  );
};

export default Loading;