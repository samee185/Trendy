import React from "react";

// Title component that takes two text props
const Title = ({ text1, text2 }) => {
  return (
    <div className="inline-flex gap-2 items-center mb-3">
      {/* Text content with different styles for each part */}
      <p className="text-gray-700">
        {text1} <span className="text-gray-700 font-medium">{text2}</span>
      </p>
      {/* Decorative line element */}
      <p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700"></p>
    </div>
  );
};

export default Title;
