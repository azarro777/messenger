import React from 'react';
import { Avatar, useChatContext } from 'stream-chat-react';
import dateFormat from 'dateformat';

const TeamChannelPreview = ({
  setActiveChannel,
  setIsCreating,
  setIsEditing,
  setToggleContainer,
  channel,
  type
}) => {
  const { channel: activeChannel, client } = useChatContext();

  const ChannelPreview = () => (
    <p className='channel-preview__item'>
      # {channel?.data?.name || channel?.data?.id}
    </p>
  );

  const DirectPreview = () => {
    const members = Object.values(channel.state.members).filter(
      ({ user }) => user.id !== client.userID
    );
    return (
      <div className='channel-preview__item single'>
        <div className='channel-preview__item__group'>
        <Avatar
          image={members[0]?.user?.image}
          name={members[0]?.user?.fullName || members[0]?.user?.id}
          size={24}
        />
        <p className='channel-preview__item__name'>{members[0]?.user?.fullName || members[0]?.user?.id}</p>
        <p className='channel-preview__item__date'>{dateFormat(members[0].user.last_active, "mmm dS, yyyy")}</p>
        </div>
        
        <p className='channel-preview__item__message'>{channel.state.messages[0].text || ''}</p>
      </div>
    );
  };

  return (
    <div
      className={
        channel?.id === activeChannel?.id
          ? 'channel-preview__wrapper__selected'
          : 'channel-preview__wrapper'
      }
      onClick={() => {
        setIsCreating(false);
        setIsEditing(false);
        setActiveChannel(channel);
        if (setToggleContainer) {
          setToggleContainer((prevState) => !prevState);
        }
      }}
    >
      {type === 'team' ? <ChannelPreview /> : <DirectPreview />}
    </div>
  );
};

export default TeamChannelPreview;
