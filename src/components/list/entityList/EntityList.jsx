import React from 'react'
import defprop from '../../../Images/defprof.svg'

function EntityList({entity}) {
  return (
    <div class="flex items-center">
    <div class="flex-shrink-0">
      <img class="w-8 h-8 rounded-full" src={defprop} alt="Neil image" />

    </div>
    <div class="flex-1 min-w-0 ms-4">
      <p class="text-sm font-medium text-gray-900 text-start truncate dark:text-white">
        {entity.entity}
      </p>

    </div>
    <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
        <path d="M6.3 2.84A1.5 1.5 0 0 0 4 4.11v11.78a1.5 1.5 0 0 0 2.3 1.27l9.344-5.891a1.5 1.5 0 0 0 0-2.538L6.3 2.841Z" />
      </svg>

    </div>
  </div>
  )
}

export default EntityList