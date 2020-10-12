import { useState, SyntheticEvent } from 'react'

interface field {
    type: string,
    value: string,
    onChange: any
}

export const useField = (type: string): field => {
  const [value, setValue] = useState('')

  const onChange = (event: any) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}