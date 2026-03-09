import { createContext, useState, useContext } from 'react'

const CommunityContext = createContext()

export function CommunityProvider({ children }) {
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: 'Sarah M.',
      avatar: 'https://images.pexels.com/photos/1055691/pexels-photo-1055691.jpeg',
      content: 'Looking for people going to Maasai Mara this July! Interested in group travel and cost sharing.',
      destination: 'Maasai Mara',
      date: new Date(Date.now() - 86400000),
      replies: 3,
    },
    {
      id: 2,
      author: 'James K.',
      avatar: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg',
      content: 'Just returned from Diani Beach! Beautiful experience. Recommend going during low season.',
      destination: 'Diani Beach',
      date: new Date(Date.now() - 172800000),
      replies: 7,
    },
    {
      id: 3,
      author: 'Grace N.',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
      content: 'Anyone interested in cultural tour to Masai village? Planning for next month.',
      destination: 'Masai Village',
      date: new Date(Date.now() - 259200000),
      replies: 5,
    },
  ])

  const addPost = (postData) => {
    const newPost = {
      id: Date.now(),
      ...postData,
      date: new Date(),
      replies: 0,
    }
    setPosts([newPost, ...posts])
    return newPost
  }

  const addReply = (postId) => {
    setPosts(posts.map(p => 
      p.id === postId 
        ? { ...p, replies: p.replies + 1 }
        : p
    ))
  }

  return (
    <CommunityContext.Provider value={{ posts, addPost, addReply }}>
      {children}
    </CommunityContext.Provider>
  )
}

export function useCommunity() {
  return useContext(CommunityContext)
}
