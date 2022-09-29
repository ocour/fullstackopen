const Notification = ({ message }) => {
    if(message.length === 0)
    {
        return null;
    }

    return (
        <div className={message[1] === 'successful' ? 'successful' : 'error'}>
            {message[0]}
        </div>
    )
}

export default Notification;