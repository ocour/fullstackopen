const Filter = ({ filter, onChange }) => {
    return (
        <div className="text-xl font-medium px-6 py-4 shadow-md bg-sky-300 rounded-lg my-2 text-gray-600">
            <p>Filter shown with</p>
            <input className="py-1 px-2 border-2 rounded-lg border-sky-200 shadow-md focus:outline-2 focus:outline-sky-400" value={filter} onChange={onChange} placeholder="give filter"/>
        </div>
    );
}

export default Filter;