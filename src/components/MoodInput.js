// src/components/MoodInput.js

const MoodInput = ({mood, onChange}) => {
  return (
    <div>
      <label htmlFor="mood" className="block text-sm font-medium text-gray-700 mb-1">気分:</label>
      <select 
        id="mood" 
        value={mood} 
        onChange={onChange}
        className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      >
        <option value="happy">嬉しい</option>
        <option value="normal">普通</option>
        <option value="sad">悲しい</option>
      </select>
    </div>
  );
};

export default MoodInput;