import React from 'react'

const Rating = ({ val }: { val: number }) => {
  return (
    <div className='rating rating-sm'>
      {new Array(5).fill(0).map((_item, index) => (
        <input
          type='text'
          name='rating-5'
          className={`mask mask-star-2 ${val >= index + 1 ? 'bg-yellow-500' : 'bg-gray-300'}`}
          key={index}
          checked={val === index + 1}
        />
      ))}
    </div>
  )
}

export default Rating
