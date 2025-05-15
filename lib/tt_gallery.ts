import { mergeAttributes, Node } from '@tiptap/core'
import { VueNodeViewRenderer } from '@tiptap/vue-3'

import GalleryComponent from '~/components/GalleryComponentTipTap.vue'

export default Node.create({
  name: 'vueComponent',

  group: 'block',

  atom: true,

  addAttributes() {
    return {
      count: {
        default: 0,
      },
      name: {
        default: 'GalleryComponent'
      }
    }
  },

  parseHTML() {
    return [
      {
        tag: 'gallery-component',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['gallery-component', mergeAttributes(HTMLAttributes)]
  },

  addNodeView() {
    // @ts-ignore
    return VueNodeViewRenderer(GalleryComponent)
  },
})