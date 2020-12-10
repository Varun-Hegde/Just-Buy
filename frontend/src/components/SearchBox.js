import React, { useState } from 'react'


const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()
    if (keyword.trim()) {
      history.push(`/search/${keyword}`)
    } else {
      history.push('/')
    }
  }

  return (

    <div className="header__left">
      <form className="header__left" onSubmit={submitHandler}>
        <i class="fas fa-search"></i>
        <input
          
          type="text"
          name='q'
          onChange={(e) => setKeyword(e.target.value)}
          placeholder='Search Products...'
          
        />
      </form>
      
        </div>
    


  )
}

export default SearchBox


//