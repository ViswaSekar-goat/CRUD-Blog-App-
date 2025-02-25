import { useState } from 'react';
import PropTypes from 'prop-types';
import { UserContext } from './UserContext';


export function UserContextProvider({children}){

  const [userInfo, setUserInfo] = useState({});

  return (
    <UserContext.Provider value={{userInfo,setUserInfo}}>
      {children}
    </UserContext.Provider>
  )
}

UserContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};