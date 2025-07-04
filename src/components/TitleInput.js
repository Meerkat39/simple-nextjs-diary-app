// src/components/TitleInput.js

const TitleInput = ({ title, onChange }) => {
  return (
    <div>
      <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">タイトル:</label>
      <input
        type="text"
        id="title"
        value={title}
        onChange={onChange}
        className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        required
      />
    </div>
  );
};

export default TitleInput;