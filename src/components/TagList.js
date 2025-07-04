// src/components/TagList.js

const TagList = ({ tags, dispatchTags }) => {
  const handleRemoveTag = (removeTag) => {
    dispatchTags({ type: "REMOVE_TAG", payload: removeTag });
  };

  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {tags.map((tag, index) => (
        <span
          key={index}
          className="flex items-center bg-blue-100 text-blue-800 text-sm font-medium pl-3 pr-1.5 py-1 rounded-full"
        >
          {tag}
          <button
            type="button"
            onClick={() => handleRemoveTag(tag)}
            className="ml-1.5 flex-shrink-0 h-5 w-5 flex items-center justify-center text-blue-500 hover:bg-blue-200 hover:text-blue-700 rounded-full transition-colors duration-200"
            aria-label={`Remove ${tag}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </span>
      ))}
    </div>
  );
};

export default TagList;