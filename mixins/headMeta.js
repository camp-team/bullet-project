export default {
  head() {
    const head = { meta: [] }
    if (this.meta.title) {
      const title = this.meta.title
      head.title = title
      head.meta.push({ hid: 'og:title', property: 'og:title', content: title })
    }
    if (this.meta.description) {
      const description = this.meta.description
      head.meta.push({
        hid: 'description',
        name: 'description',
        content: description,
      })
      head.meta.push({
        hid: 'og:description',
        property: 'og:description',
        content: description,
      })
    }
    return head
  },
}
