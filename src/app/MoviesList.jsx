import React from 'react'

export default function MoviesList() {
  return (
    <div className="bg-white p-4 shadow rounded">
    <img src="data:image/jpeg;base64,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" alt="Movie Poster" className="mb-2 rounded"/>
    <h3 className="text-lg font-semibold">Movie Title</h3>
    <p className="text-gray-600">Movie description goes here...</p>
  </div>
  )
}
