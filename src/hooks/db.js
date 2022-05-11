import { useEffect, useState } from 'react'
import { db, collection, getDocs } from 'services/firebase'

function useCollection (collectionName) {
  const [data, setData] = useState(null)

  useEffect(() => {
    async function fetchCollection () {
      const docs = []
      const querySnapshot = await getDocs(collection(db, collectionName))
      querySnapshot.forEach((doc) => {
        docs.push({
          id: doc.id,
          ...doc.data()
        })
      })

      setData(docs)
    }

    fetchCollection()
  }, [collectionName])

  return data
}

export default useCollection
