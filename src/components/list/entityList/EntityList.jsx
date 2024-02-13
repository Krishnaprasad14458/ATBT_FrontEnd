import React from 'react'
import defprop from '../../../Images/defprof.svg'
import { caseLetter } from '../../../utils/utils'

function EntityList({ entity }) {
  return (
    <div className="flex items-center">
      <div className="flex-shrink-0">
        <img className="w-8 h-8 rounded-full" src={`https://picsum.photos/seed/${entity.id}/100`} alt="Neil image" />

      </div>
      <div className="flex-1 min-w-0 ms-4">
        <p className="text-sm font-medium text-gray-900 text-start truncate dark:text-white">
          {caseLetter(entity?.Entite_Name ?? "none")}
        </p>

      </div>
      <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5" aria-hidden="true">
          <path fill-rule="evenodd" d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd">
          </path>
        </svg>
      </div>
    </div>
  )
}

export default EntityList