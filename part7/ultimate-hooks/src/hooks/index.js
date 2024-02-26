import { useEffect, useState } from 'react'
import axios from 'axios'

export const useResource = (baseUrl, serviceType) => {
  const initialValue = serviceType === 'person' ? { name: '', number: '' } : ''
  const [value, setValue] = useState(initialValue)
  const [resources, setResources] = useState([])

  useEffect(() => {
    const getAll = async () => {
      const response = await axios.get(baseUrl)
      setResources(response.data)
    }
    getAll()
  }, [])

  const onChange = ({ target }) => {
    if (serviceType === 'notes') {
      setValue(target.value)
      return
    }
    console.log('came here')
    const updatePerson = {
      ...value,
      [target.id]: target.value,
    }
    setValue(updatePerson)
  }

  const create = async (newObject) => {
    console.log('newObject', newObject)
    const response = await axios.post(baseUrl, newObject)
    setResources(resources.concat(response.data))
    if (serviceType === 'notes') {
      setValue('')
    } else if (serviceType === 'person') {
      setValue({ name: '', number: '' })
    }
  }

  const service = {
    value,
    onChange,
    create,
  }

  return [resources, service]
}
