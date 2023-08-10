
import React, { useState } from 'react';
import { Chat } from 'stream-chat-react';
import { Channellistcontainer, Channelcontainer, Auth } from '../msg_components';
import "./MessagingApp.css"
import { StreamChat } from 'stream-chat';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const apiKey = 's2x6d9jvbrgg';
const authToken = cookies.get("token");

const client = StreamChat.getInstance(apiKey);

const MessagingApp = () => {
    const [createType, setCreateType] = useState('');
    const [isCreating, setIsCreating] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
  return (
    <div className="app__wrapper">
        <Chat client={client} theme="team light">
            <Channellistcontainer 
                isCreating={isCreating}
                setIsCreating={setIsCreating}
                setCreateType={setCreateType}
                setIsEditing={setIsEditing}
            />
            <Channelcontainer 
                isCreating={isCreating}
                setIsCreating={setIsCreating}
                isEditing={isEditing}
                setIsEditing={setIsEditing}
                createType={createType}
            />
        </Chat>
    </div>
  )
}

export default MessagingApp