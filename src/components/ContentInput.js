const ContentInput = ({ content, onChange }) => {
  return (
    <div>
      <label htmlFor="content">内容:</label>
      <textarea id="content" value={content} onChange={onChange} />
    </div>
  );
};

export default ContentInput;
