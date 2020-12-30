export default {
  head() {
    const head = { meta: [] }
    if (this.meta.title) {
      const title = this.meta.title
      head.title = title
      head.meta.push({ hid: 'ogTitle', property: 'og:title', content: title })
    }
    if (this.meta.description) {
      const description = this.meta.description
      head.meta.push({
        hid: 'description',
        name: 'description',
        content: description,
      })
      head.meta.push({
        hid: 'ogDescription',
        property: 'og:description',
        content: description,
      })
    }
    return head
  },
}
