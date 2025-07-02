const MoodInput = ({mood, onChange}) => {
  return (
    <div>
      <label htmlFor="mood">気分:</label>
      <select id="mood" value={mood} onChange={onChange}>
        <option value="happy">嬉しい</option>
        <option value="normal">普通</option>
        <option value="sad">悲しい</option>
      </select>
    </div>
  );
};

export default MoodInput;
