import { mergeAttributes, Node } from '@tiptap/core'
import { VueNodeViewRenderer } from '@tiptap/vue-3'
import GalleryComponent from '~/components/GalleryComponentTipTap.vue'

// https://github.com/open-webui/open-webui
// https://tproger.ru/articles/zapuskaem-lokalno-deepseek-r1-dlya-prilozheniya-rag
// https://github.com/comfyanonymous/ComfyUI

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