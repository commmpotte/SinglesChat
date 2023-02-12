import React from 'react'
import { useState, useEffect } from 'react'
import { Dexie } from 'dexie'
import 'bootstrap/dist/css/bootstrap.min.css'

const db = new Dexie('chatApp')
db.version(1).stores({
  chat: '++id, message, author',
})
const { chat } = db

//Seeking a authors list
chat.toArray().then((messages) => {
  const authors = []

  messages.forEach((message) => {
    if (!authors.includes(message.author)) {
      authors.push(message.author)
    }
  })
})

const ListMembers = ({ authors }) => {
  // Using  hooks to set the current screen width and update it whenever the screen size changes
  const [screenWidth, setScreenWidth] = useState(window.innerWidth)

  useEffect(() => {
    function handleResize() {
      setScreenWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  if (!authors) {
    return <p className="display-6 lead">No active users in a room</p>
  }
  return (
    <>
      {screenWidth > 768 ? (
        <div
          className="col-md-6 col-lg-5 col-xl-5 mb-4 mb-md-0 scroll d-sm-none d-md-block d-none d-sm-block lead"
          data-mdb-perfect-scrollbar="true"
          style={{
            overflowY: 'scroll',
            scrollBehavior: 'smooth',
            height: '400px',
          }}
        >
          List of members
          {authors.map((author, index) => (
            <div className="d-flex align-items-center" key={index}>
              <div
                className="card m-1 border-info mx-auto"
                key={author}
                style={{ width: '260px' }}
              >
                <div className="card-body">
                  <h5 className="card-title">{author}</h5>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="dropdown mb-3">
          <button
            className="btn btn-info dropdown-toggle"
            type="button"
            id="dropdownMenu2"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            List of members
          </button>
          <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
            {authors.map((author) => (
              <button className="dropdown-item" type="button" key={author}>
                {author}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
export default ListMembers
