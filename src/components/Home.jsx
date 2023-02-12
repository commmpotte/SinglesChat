import React from 'react'
import { useState, useEffect } from 'react'
import { Dexie } from 'dexie'
import ChatWindow from './ChatWindow'
import ListMembers from './ListMembers'
import 'bootstrap/dist/css/bootstrap.min.css'

const db = new Dexie('chatApp')
db.version(1).stores({
  chat: '++id, message, author',
})
const { chat } = db

function Home() {
  const [authors, setAuthors] = useState(null)

  useEffect(() => {
    chat.toArray().then((messages) => {
      const authorsArray = []

      messages.forEach((message) => {
        if (!authorsArray.includes(message.author)) {
          authorsArray.push(message.author)
        }
      })
      setAuthors(authorsArray)
    })
  }, [])

  const addMessage = async (event) => {
    event.preventDefault()
    const messageField = document.querySelector('#messageInput')

    await chat.add({
      message: messageField.value,
      author: sessionStorage.usernameData,
    })
    messageField.value = ''
  }

  const handleClick = () => {
    sessionStorage.clear()
    window.location.reload()
  }

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

  return (
    <section className="container wrapper pb-4">
      <div className="main bg-white">
        <div className="p-4 w-100 border rounded-5">
          <div className="row">
            <ListMembers authors={authors} />
            <ChatWindow />
          </div>
          <div className="d-flex w-100 align-items-center mt-2 mb-2">
            <div className="col-md-6 col-lg-5 col-xl-5">
              {screenWidth > 768 ? (
                <button className="btn btn-info " onClick={handleClick}>
                  Logout
                </button>
              ) : (
                <button
                  className="btn btn-info d-flex"
                  style={{ padding: '0.35rem' }}
                  onClick={handleClick}
                >
                  <i className="material-symbols-outlined align-items-center">
                    logout
                  </i>
                </button>
              )}
            </div>
            <div className="m-2 w-100">
              <form
                className="input-group mb-0 mw-100 text"
                onSubmit={addMessage}
              >
                <input
                  id="messageInput"
                  type="text"
                  className="form-control bg-white"
                  placeholder="Write your message"
                  rows="4"
                  required
                />
                {screenWidth > 768 ? (
                  <button type="submit" className="btn btn-info">
                    Send
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="btn btn-info d-flex"
                    style={{ padding: '0.35rem' }}
                  >
                    <span class="material-symbols-outlined">send</span>
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
export default Home
