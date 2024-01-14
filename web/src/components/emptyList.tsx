import { memo } from "react";

function EmptyList() {
  return (
    <div className="flex flex-col items-center">
      <h2>Your movie list is empty</h2>
      <button className="bg-green  mt-5 py-4 rounded-lg w-[202px]">
        Add a new movie
      </button>
    </div>
  );
}

export default memo(EmptyList);
