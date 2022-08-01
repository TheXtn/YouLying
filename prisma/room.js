import prisma from './prisma'
export const getAllrooms = async () => {
    const rooms = await prisma.room.findMany({})
    return rooms
  }