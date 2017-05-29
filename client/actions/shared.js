export const REQUEST_FAILD = 'REQUEST_FAILD';

export function requestFaild(error) {
   return {
      type: REQUEST_FAILD,
      error
   }
}