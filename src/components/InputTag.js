// src/components/InputTag.js

const InputTag = ({ currentTag, dispatchTags }) => {
  const handleAddTag = () => {
    dispatchTags({ type: "ADD_TAG" });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
    }
  };

  return (
    <div>
      <label
        htmlFor="tags"
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        タグ:
      </label>
      <div className="flex items-center gap-2">
        <input
          type="text"
          id="tags"
          value={currentTag}
          onChange={(e) =>
            dispatchTags({ type: "SET_CURRENT_TAG", payload: e.target.value })
          }
          onKeyDown={handleKeyDown}
          className="flex-grow block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="タグを入力してEnter"
        />
        <button
          type="button"
          onClick={handleAddTag}
          className="flex-shrink-0 px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 
     focus:ring-offset-2 focus:ring-indigo-500 whitespace-nowrap"
        >
          追加
        </button>
      </div>
    </div>
  );
};

export default InputTag;
