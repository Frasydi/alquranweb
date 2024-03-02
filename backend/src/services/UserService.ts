import { Prisma } from "@prisma/client"
import prisma from "@src/other/prisma"

export async function getAllSurah() {
  try {
    const result = await fetch("https://equran.id/api/v2/surat")
    if(result.ok == false) return {
      code : 500,
      message : "Ada Masalah"
    }

    const json = await result.json()
    return {
      data : json.data,
      message : "Berhasil",
      code : 200,
    }

  }catch(err) {
    console.log(err)
    return {
      code : 500,
      message : "Ada Masalah"
    }
  }
}

export async function getSurah(id : number) {
  try {
    if(id > 114) return {
      code : 400,
      message : "Surah tidak lebih dari 114"
    }
    const result = await fetch("https://equran.id/api/v2/surat/"+id)
    if(result.ok == false) return {
      code : 500,
      message : "Ada Masalah"
    }

    const json = await result.json()
    return {
      data : json.data,
      message : "Berhasil",
      code : 200,
    }

  }catch(err) {
    console.log(err)
    return {
      code : 500,
      message : "Ada Masalah"
    }
  }
}


export async function getBookmark() {
  try {
    const data = await prisma.bookmard.findMany()
    return {
      code : 200,
      message : "Berhasil",
      data
    }
  }catch(err) {
    console.log(err)
    return {
      code : 500,
      message : "Ada Masalah"
    }
  }
}
export async function deleteBookmard(id : number) {
  try {
    await prisma.bookmard.delete({
      where : {
        id
      }
    })
    return {
      code : 200,
      message : "Berhasil",
    }
  }catch(err) {
    console.log(err)
    return {
      code : 500,
      message : "Ada Masalah"
    }
  }
}

export async function postbookmark(surah : number, ayat : number) {
  try {
    if(surah > 114) return {
      code : 400,
      message : "Surah tidak lebih dari 114"
    }
    const result = await fetch("https://equran.id/api/v2/surat/"+surah)
    if(result.ok == false) return {
      code : 500,
      message : "Ada Masalah"
    }

    const json = await result.json()

    if(json.data.ayat == null) return {
      code : 400,
      message : "Tidak Menemukan Surah"
    }

    if(json.data.ayat[ayat] == null) return {
      code : 400,
      message : "Tidak Menemukan Ayat"
    }
    const dataayat = json.data.ayat[ayat]

    await prisma.bookmard.create({
      data : {
        ayat : ayat+"",
        surah : surah+"",
        arab : dataayat.teksArab,
        latin : dataayat.teksLatin,
        terjemahan : dataayat.teksIndonesia,
      }
    })

    return {
      data : json.data,
      message : "Berhasil",
      code : 200,
    }

  }catch(err) {
    console.log(err)
    if(err instanceof Prisma.PrismaClientKnownRequestError) {
      if(err.code == "P2002") {
        return {
          code : 400,
          message : "Surah dan ayat sudah ditambahkan ke bookmaark"
        }
      }
    }
    return {
      code : 500,
      message : "Ada Masalah"
    }
  }
}