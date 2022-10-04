import React from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import Button from '../Button';
import './index.css';

const Suggesstions = (props) => {
  const { suggesstions = [], loading, error, onFollow } = props;

  if (loading) return <p className="suggestions-info">Laoding</p>;

  return (
    <div className="suggesstions-card">
      <h5>Suggesstions</h5>
      {error && <p className="error-text">Error getting suggestions</p>}

      {suggesstions.length === 0 && <p className="suggestions-info">No Suggesstions</p>}

      {suggesstions.map((user) => {
        return (
          <div key={user._id} className="suggesstions-list">
            <p className="suggesstions-user">
              {user.firstName} {user.lastName}
            </p>
            <Button label="Follow" icon size={'small'} onClick={() => onFollow(user._id)}>
              <AiOutlinePlus size={12} />
            </Button>
          </div>
        );
      })}
    </div>
  );
};

export default Suggesstions;
