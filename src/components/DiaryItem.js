const DiaryItem = ({ diary }) => {
  return (
    <div
      key={diary.id}
      style={{
        border: "1px solid #ccc",
        padding: "10px",
        margin: "10px 0",
      }}
    >
      <h2>{diary.title}</h2>
      <p>{diary.content}</p>
      <small>{new Date(diary.date).toLocaleDateString()}</small>
      <p>気分: {diary.mood}</p>
      <div>
        {diary.tags.map((tag, index) => (
          <span
            key={index}
            style={{
              backgroundColor: "#eee",
              padding: "2px 5px",
              borderRadius: "3px",
              marginRight: "5px",
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default DiaryItem;
