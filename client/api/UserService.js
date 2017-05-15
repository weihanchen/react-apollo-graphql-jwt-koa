import {
   checkStatus,
   parseJSON
} from './helper.js';

import {
   USERS_URL
} from '../config';

export default class UserService {

   requestSignupUser(displayName, password, username) {
      const options = {
         method: 'POST',
         headers: new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json'
         }),
         mode: 'cors',
         body: JSON.stringify({
            displayName: displayName,
            password: password,
            username: username
         })
      }
      return fetch(USERS_URL, options)
         .then(checkStatus)
         .then(parseJSON)


   }
}