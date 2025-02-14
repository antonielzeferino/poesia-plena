import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

export async function POST(req: Request) {
  try {
    console.log("username, password")
    const { username, password }: { username: string; password: string } = await req.json()
    
    // Verifica se os campos de username e senha estão preenchidos
    if (!username || !password) {
      return new Response(
        JSON.stringify({ message: "Usuário e senha são obrigatórios" }),
        { status: 400 }
      )
    }

    // Verifica se o username já está registrado
    const existingUser = await prisma.user.findUnique({
      where: { username },
    })

    if (existingUser) {
      return new Response(
        JSON.stringify({ message: "Usuário já está em uso" }),
        { status: 400 }
      )
    }

    // Criptografa a senha
    const hashedPassword = await bcrypt.hash(password, 12)

    // Cria o usuário no banco de dados
    await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        name: "",
      },
    })

    // Retorna resposta de sucesso
    return new Response(
      JSON.stringify({ message: "Usuário registrado com sucesso!" }),
      { status: 201 }
    )
  } catch (error) {
    // Caso ocorra algum erro, retorna erro 500 com resposta JSON
    console.error("Erro ao registrar usuário:", error instanceof Error ? error.message : error)
    return new Response(
      JSON.stringify({ message: "Erro ao criar usuário. Tente novamente." }),
      { status: 500 }
    )
  }
}
