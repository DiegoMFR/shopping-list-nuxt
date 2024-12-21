import { z } from 'zod'

export default defineEventHandler(async (event) => {

  const { email, password } = await readValidatedBody(event, z.object({
    email: z.string().email(),
    password: z.string().min(8),
  }).parse)

  const db = hubDatabase();

  await db.exec(
    `CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT NOT NULL);`
    );

  const hashedPassword = await hashPassword(password)

  await db
        .prepare(
          'INSERT INTO users (email, password) VALUES (?1, ?2)'
        )
        .bind(email, hashedPassword)
        .run();

  // In real applications, you should send a confirmation email to the user before logging them in.

  await setUserSession(event, {
    user: {
      email,
    },
    loggedInAt: Date.now(),
  })

  return setResponseStatus(event, 201)
})