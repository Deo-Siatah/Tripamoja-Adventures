import { useEffect, useState } from 'react'

export default function PageLoader() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) return prev
        return prev + Math.random() * 30
      })
    }, 100)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    setProgress(100)
    const timer = setTimeout(() => {
      setProgress(0)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="fixed top-0 left-0 h-1 bg-gradient-to-r from-secondary to-accent transition-all duration-300 z-50" style={{ width: `${progress}%` }} />
  )
}
