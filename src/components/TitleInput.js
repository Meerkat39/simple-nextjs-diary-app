const TitleInput = ({ title, onChange }) => {
  return (
    <div>
      <label htmlFor="title">タイトル:</label>
      <input
        type="text"
        id="title"
        value={title}
        onChange={onChange}
      />
    </div>
  );
};

export default TitleInput;
