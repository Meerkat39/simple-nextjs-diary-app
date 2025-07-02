const TagList = ({ tags, dispatchTags }) => {
  const handleRemoveTag = (removeTag) => {
    dispatchTags({ type: "REMOVE_TAG", payload: removeTag });
  };

  return (
    <div style={{ marginTop: "5px" }}>
      {tags.map((tag, index) => (
        <span
          key={index}
          style={{
            backgroundColor: "#eee",
            padding: "2px 8px",
            borderRadius: "10px",
            marginRight: "5px",
            display: "inline-flex",
            alignItems: "center",
          }}
        >
          {tag}
          <button
            type="button"
            onClick={() => handleRemoveTag(tag)}
            style={{
              border: "none",
              backgroundColor: "transparent",
              marginLeft: "5px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            ×
          </button>
        </span>
      ))}
    </div>
  );
};

export default TagList;
