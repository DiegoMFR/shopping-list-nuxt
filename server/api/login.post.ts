import { z } from 'zod'

interface DBUser {
  id: number
  email: string
  password: string
}

const invalidCredentialsError = createError({
  statusCode: 401,
  // This message is intentionally vague to prevent user enumeration attacks.
  message: 'Invalid credentials',
})

export default defineEventHandler(async (event) => {

  const { email, password } = await readValidatedBody(event, z.object({
    email: z.string().email(),
    password: z.string().min(8),
  }).parse)

  const db = hubDatabase();

  await db.exec(
    `CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT NOT NULL, password TEXT NOT NULL);`
    );

  const user: DBUser | null = await db
        .prepare(
          'SELECT * FROM users WHERE email = (?1)'
        )
        .bind(email)
        .first();

  console.log(user);
  const pass = await hashPassword('12345678');
  console.log(pass)

  if (!user) {
    throw invalidCredentialsError
  }

  

  if (!(await verifyPassword(user.password, password))) {
    throw invalidCredentialsError
  }

  await setUserSession(event, {
    user: {
      email,
      id: user.id,
    },
    loggedInAt: Date.now(),
    startedAt: 0
  })

  return setResponseStatus(event, 201)
})