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
      <label htmlFor="tags">タグ:</label>
      <div style={{ display: "flex", alignItems: "center" }}>
        <input
          type="text"
          id="tags"
          value={currentTag}
          onChange={(e) =>
            dispatchTags({ type: "SET_CURRENT_TAG", payload: e.target.value })
          }
          onKeyDown={handleKeyDown}
        />
        <button
          type="button"
          onClick={handleAddTag}
          style={{ marginLeft: "5px" }}
        >
          追加
        </button>
      </div>
    </div>
  );
};

export default InputTag;
