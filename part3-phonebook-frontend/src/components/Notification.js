const Notification = ({ message }) => {
    if(message.length === 0)
    {
        return null;
    }

    return (
        <div className={`${message[1] === 'successful' 
        ? 'successful border-green-600 border-2 p-4 rounded-sm bg-green-100 text-lg'
        : 'error border-red-600 border-2 p-4 rounded-sm bg-red-100 text-lg'}`}>
            {message[0]}
        </div>
    )
}

export default Notification;