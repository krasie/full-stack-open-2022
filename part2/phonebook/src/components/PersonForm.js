import React from "react";

const PersonFrom = ({persons,newPersons,filter,addPhonebook,handleNewName,handleNewPhone}) =>{
  return (
    <form onSubmit={addPhonebook}>
        <div>
          name: <input value={newPersons.name} onChange={handleNewName}/>
        </div>
        <div>
          number: <input value={newPersons.number} onChange={handleNewPhone}/>
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
    </form>
  )
}

export default PersonFrom