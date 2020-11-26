const functions = require('firebase-functions')
const { Nuxt } = require('nuxt')

const config = {
  buildDir: 'nuxt',
  dev: false,
  debug: true,
}

const nuxt = new Nuxt(config)

exports.ssr = functions.https.onRequest(async (request, response) => {
  await nuxt.ready()
  return nuxt.render(request, response)
})
