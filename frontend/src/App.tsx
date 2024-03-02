import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import useFetch from './useFetch'

function App() {
  const [selectedSurah, setSelectedSurah] = useState<string | null>(null)

  const [data, refetch] = useFetch("/api" + (selectedSurah == null ? "" : "/surah/" + selectedSurah))
  const [bookmark, refetchBookmark] = useFetch("/api/bookmark")

  async function booking(surah: string, ayat: string) {
    const inds = (bookmark as any[]).findIndex(el2 => el2.ayat == ayat && surah == el2.surah) 
    if (inds != -1) {
      const bookmarks = bookmark[inds]

      try {
        const feting = await fetch(`/api/bookmark/${bookmarks.id}`, {
          method: "DELETE",
          
        })
        const json = await feting.json()
        if (feting.ok == false) return alert(json.message)
        alert("Berhasil")
        refetchBookmark()
        refetch()

      } catch (err) {
        console.log(err)
        alert("Error")
      }
    }
    else {
      try {
        const feting = await fetch(`/api/bookmark/${surah}/${ayat}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
        })
        const json = await feting.json()
        if (feting.ok == false) return alert(json.message)
        alert("Berhasil")
        refetchBookmark()
        refetch()

      } catch (err) {
        console.log(err)
        alert("Error")
      }
    }
  }


  return (
    <>
      <h2 onClick={() => {
        setSelectedSurah(null)
      }}>Selamat Datang di Alquran Web</h2>
      <div style={{
        display: "flex",
        flexDirection: "column",
        gap: "2rem"
      }}>
        {
          data != null && selectedSurah == null ? Array.isArray(data) && data?.map((el: any) => <div onClick={() => {
            setSelectedSurah(el.nomor)
          }} className={"itemsurah"} style={{
            display: "flex",
            gap: "2rem",
            padding: "0 2rem",
            borderRadius: ".5rem",

          }}>
            <h2>{el.nomor}</h2>
            <div style={{
              display: "flex",
              gap: "2rem",
              alignItems: "center"
            }}>
              <h2>{el.namaLatin}</h2>
              <h3>{el.nama}</h3>
            </div>
          </div>)
            : data != null && data?.ayat?.map((el: any) => <div onClick={() => {
              booking(data.nomor, el.nomorAyat)
            }} className='itemayat' style={{
              backgroundColor: (bookmark as any[]).findIndex(el2 => el2.ayat == el.nomorAyat && data.nomor == el2.surah) != -1 ? "yellow" : ""
            }}>
              <h2>{el.nomorAyat}</h2>
              <div>
                <h3>{el.teksArab}</h3>
                <p>{el.teksLatin}</p>
                <p>{el.teksIndonesia}</p>
              </div>
            </div>)}
      </div>
    </>
  )
}

export default App
