import React, { useContext, useEffect, useState } from 'react'
import { useHttp } from '../hooks/http.hook'
import { AuthContext } from '../context/AuthContext'
import { useHistory } from 'react-router-dom'

export const CreatePage = () => {
  const history = useHistory()
  const auth = useContext(AuthContext)
  const { request } = useHttp()
  const [link, setLink] = useState('')

  useEffect(() => {
    window.M.updateTextFields()
  }, [])

  const pressHandler = async event => {
    if (event.key === 'Enter') {
      try {
        const data = await request('api/link/generate', 'POST', { from: link }, {
          Authorization: `Bearer ${auth.token}`
        })
        history.push(`/detail/${data.link._id}`)
      } catch (e) {

      }
    }
  }

  return (
    <div className="row">
      <div className="col s8 aggset-s2">
        <label htmlFor="link">Введите ссылку</label>
        <input
          placeholder="Вставьте ссылку"
          id="link"
          type="text"
          value={link}
          onChange={e => setLink(e.target.value)}
          onKeyPress={pressHandler}
        />
      </div>
    </div>
  )
}