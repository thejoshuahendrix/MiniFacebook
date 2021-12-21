import { ChatEngine } from 'react-chat-engine';


const Chat = ({ user }: any) => {
    return (
        <div>
            <ChatEngine
                publicKey={'bb653195-267f-4bd9-837d-82747fe6922b'}
                userName={user}
                userSecret={'1234'}
            />

        </div>
    )
}

export default Chat