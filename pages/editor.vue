<template>
  <LazyGalleryComponent :count="5" />
  <br>
  <GalleryComponent :count="9" />
  <br>
  <component is="h1">Title</component>
  <br>

  <editor-content :editor="editor" />
  <button @click="toHtml">to HTML</button>

  <template v-for="data, i of htmls" :key="i">
    <div v-if="typeof(data)=='string'" v-html="data"></div>
    <!-- <p v-else>{{ data.name }} {{ data.count }}</p> -->
    <component :is="components[data.name]" v-bind="data" v-else></component>
  </template>

</template>

<script setup lang="ts">
import StarterKit from '@tiptap/starter-kit'
import { Editor, EditorContent } from '@tiptap/vue-3'
import VueComponent from '~/lib/tt_gallery'
import { LazyGalleryComponent } from '#components'

const components = {
  'GalleryComponent': LazyGalleryComponent
} as any

const editor = ref(null as never as Editor)
const htmls = ref([] as any[])
const toHtml = () => {
  if (editor.value) {
    console.log(editor.value.getJSON())
    console.log(editor.value.getHTML())

    const VueComponents = ['gallery-component', 'opros-component']
    
    const els = editor.value.getJSON().content?.filter(el=>el.type=='vueComponent')
    let html = editor.value.getHTML() 
    
    console.log(els?.length)
    if (els?.length) {
      let elsIter = 0
      let g = 0
      let o = 0
      while (true) {
        g = html.indexOf('<gallery-component')
        o = html.indexOf('<opros-component')
        if (g==-1 && o==-1) {
          htmls.value.push(html)
          break
        }
        if (g>o) {
          htmls.value.push(html.slice(0, g))
          htmls.value.push(els[elsIter].attrs)
          elsIter++
          g = html.indexOf('gallery-component>', g) + 18
          html = html.slice(g)
        }
        if (o>g) {
          htmls.value.push(html.slice(0, o))
          htmls.value.push(els[elsIter].attrs)
          elsIter++
          o = html.indexOf('opros-component>', o) + 16
          html = html.slice(o)
        }
      }
    } else {
      htmls.value.push(html)
    }
    console.log(htmls.value)     
  }
}

onMounted(()=>{
  editor.value = new Editor({
    extensions: [
      StarterKit,
      VueComponent,
    ],
    content: `
      <p>
        This is still the text editor you’re used to, but enriched with node views.
      </p>
      <gallery-component></gallery-component>
      <p>
      Did you see that? That’s a Vue component. We are really living in the future.
      </p>
      <gallery-component count="20"></gallery-component>
      <p>
      Did you see that? That’s a Vue component. We are really living in the future.
      </p>
    `,
  })
})

onBeforeUnmount(()=>{
  editor.value?.destroy()
})
</script>

<style>
/* Basic editor styles */
.tiptap :first-child {
  margin-top: 0;
}

  /* List styles */
.tiptap ul, .tiptap ol {
  padding: 0 1rem;
  margin: 1.25rem 1rem 1.25rem 0.4rem;
}
.tiptap li p {
  margin-top: 0.25em;
  margin-bottom: 0.25em;
}
  

  /* Heading styles */
.tiptap h1,
.tiptap h2,
.tiptap h3,
.tiptap h4,
.tiptap h5,
.tiptap h6 {
  line-height: 1.1;
  margin-top: 2.5rem;
  text-wrap: pretty;
}

.tiptap h1,
.tiptap h2 {
  margin-top: 3.5rem;
  margin-bottom: 1.5rem;
}

.tiptap h1 {
  font-size: 1.4rem;
}

.tiptap h2 {
  font-size: 1.2rem;
}

.tiptap h3 {
  font-size: 1.1rem;
}

.tiptap h4,
.tiptap h5,
.tiptap h6 {
  font-size: 1rem;
}

  /* Code and preformatted text styles */
.tiptap code {
  background-color: var(--purple-light);
  border-radius: 0.4rem;
  color: var(--black);
  font-size: 0.85rem;
  padding: 0.25em 0.3em;
}

.tiptap pre {
  background: var(--black);
  border-radius: 0.5rem;
  color: var(--white);
  font-family: 'JetBrainsMono', monospace;
  margin: 1.5rem 0;
  padding: 0.75rem 1rem;
}

.tiptap code {
  background: none;
  color: inherit;
  font-size: 0.8rem;
  padding: 0;
}


.tiptap blockquote {
  border-left: 3px solid var(--gray-3);
  margin: 1.5rem 0;
  padding-left: 1rem;
}

.tiptap hr {
  border: none;
  border-top: 1px solid var(--gray-2);
  margin: 2rem 0;
}

</style>