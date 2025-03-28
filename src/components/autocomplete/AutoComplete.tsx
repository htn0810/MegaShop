import { Input } from '@/components/ui/input'
import { Option } from '@/types/common.type'
import { CheckIcon } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'

type props = {
  options: Option[]
  selectedOption: Option | null
  onSelect: React.Dispatch<React.SetStateAction<Option | null>>
  placeholder?: string
  className?: string
}
const AutoComplete = (props: props) => {
  const { options, selectedOption, onSelect, placeholder, className } = props
  const [inputValue, setInputValue] = useState('')
  const [filteredOptions, setFilteredOptions] = useState<Option[]>([])
  const [isOpen, setIsOpen] = useState(false)

  const componentRef = useRef<HTMLDivElement>(null)

  const handleClickOption = (option: Option) => {
    if (option.value !== selectedOption?.value) {
      onSelect(option)
      setInputValue(option.label)
      setIsOpen(false)
    } else {
      onSelect(null)
      if (inputValue.trim() === option.label) {
        setInputValue('')
      }
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value.trim() === '') {
      setInputValue('')
      onSelect(null)
      return
    }
    setInputValue(value)
    const filtered = options.filter((option) => option.label.toLowerCase().includes(value.trim().toLowerCase()))
    setFilteredOptions(filtered)
    setIsOpen(true)
  }

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (componentRef.current && !componentRef.current.contains(e.target as Node)) {
        setIsOpen(false)
        if (selectedOption && inputValue.trim() !== selectedOption.label) {
          setInputValue(selectedOption.label)
        }
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [selectedOption, inputValue])

  useEffect(() => {
    if (!selectedOption) {
      setInputValue('')
    }
    if (selectedOption && selectedOption?.label !== inputValue) {
      setInputValue(selectedOption.label)
    }
  }, [selectedOption])

  useEffect(() => {
    setFilteredOptions(options)
  }, [options])

  return (
    <div ref={componentRef} className={`relative w-full ${className}`}>
      <Input
        value={inputValue}
        onChange={handleInputChange}
        placeholder={placeholder}
        onFocus={() => setIsOpen(true)}
      />
      {isOpen && filteredOptions.length > 0 && (
        <div className='absolute top-10 left-0 h-fit max-h-[200px] overflow-y-auto w-full px-2 py-1 bg-white shadow-md rounded-md dark:bg-gray-800 dark:text-white'>
          {filteredOptions.map((option) => (
            <div
              key={option.value}
              className={`cursor-pointer flex items-center gap-x-1 px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md ${
                selectedOption?.value === option.value ? 'font-medium bg-gray-100 dark:bg-gray-700' : ''
              }`}
              onClick={() => handleClickOption(option)}
            >
              <span>{option.label}</span>
              {selectedOption?.value === option.value && <CheckIcon size={16} className='text-black dark:text-white' />}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default AutoComplete
