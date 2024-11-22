import { Dot } from 'lucide-react'
import React from 'react'

const Pines = ({color}:{color:string}) => {
  return (
    <div className='flex items-center'>
        {[1,2,3,4,5].map((item) => (<Dot color={color} key={item} size={35}/>))}
    </div>
  )
}

export default Pines