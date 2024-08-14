import * as PostalMime from 'postal-mime'

export interface Env {}

export default {
  async email(message: EmailMessage, env: Env, ctx: ExecutionContext): Promise<void> {
    await handleEmail(message, env, ctx)
  },
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function handleEmail(message: EmailMessage, env: Env, ctx: ExecutionContext): Promise<void> {
  if (["friend@example.com", "girlfriend@example.com"].indexOf(message.from) > 0) {
    const parser = new PostalMime.default()
    const email = await parser.parse(await new Response(message.raw).arrayBuffer())
    // console.log(email.html)
    let groups = /Verification\s+Code.*>(\d{6})</gsmi.exec(email.html);
    if (groups) {
      let code = groups[1]
      console.log("Code found: " + code)
      //await fetch(`https://api.example.com/verify?code=${code}`)
    } else {
      console.log("No code found")
    }
  }
}

