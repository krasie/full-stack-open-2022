const Notification = ({message,type}) => {
  if(message){
    return (
      <>
        <h3 className={type}>{message}</h3>
      </>
    )
  }else{
    return null;
  }
}

export default Notification