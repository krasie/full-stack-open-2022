import React from "react";

const Notification  = ({message,type='info'}) =>{
  if(message === null){
    return null
  }
  return (
    <>
      <h3 className={type}>{message}</h3>
    </>
  )
}

export default Notification