'use client'
import React, { useState, useEffect } from 'react'
import ReactPlayer from 'react-player/youtube'

export default function YoutubePlayer({ url }: { url: string }) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) return null

  return (
    <div className="mt-6 sm:mt-8 mb-18">
      <ReactPlayer url={url} />
    </div>
  )
}
