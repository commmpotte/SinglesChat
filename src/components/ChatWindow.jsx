import React from 'react'
import { Dexie } from 'dexie'
import { useLiveQuery } from 'dexie-react-hooks'
import 'bootstrap/dist/css/bootstrap.min.css'

const db = new Dexie('chatApp')
db.version(1).stores({
  chat: '++id, message, author',
})
const { chat } = db

function ChatWindow() {
  const allItems = useLiveQuery(() => chat.toArray(), [])

  return (
    <div
      className="scroll col-md-6 col-lg-7 col-xl-7"
      style={{
        overflowY: 'scroll',
        scrollBehavior: 'smooth',
        height: '400px',
      }}
    >
      <div className="list-unstyled mb-4">
        {allItems?.map(({ id, message, author }) =>
          author === sessionStorage.usernameData ? (
            <div className="d-flex justify-content-end mb-4" key={id}>
              <div className="card bg-info" style={{ minWidth: '260px' }}>
                <div className="card-header d-flex justify-content-between">
                  <p className="fw-bold mb-0">{author}</p>
                  <p className="text-muted small mb-0">
                    <i className="far fa-clock"></i>
                  </p>
                </div>
                <div className="card-body text-start">
                  <p className="mb-0">{message}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="d-flex justify-content-between mb-4" key={id}>
              <div className="card" style={{ minWidth: '260px' }}>
                <div className="card-header d-flex justify-content-between">
                  <p className="fw-bold mb-0"> {author}</p>
                  <p className="text-muted small mb-0">
                    <i className="far fa-clock"></i>
                  </p>
                </div>
                <div className="card-body text-start">
                  <p className="mb-0">{message}</p>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  )
}
export default ChatWindow
