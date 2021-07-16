import Output from 'editorjs-react-renderer';

const BlogDetail = (props) => {
  const { data, error } = props;

  if (error) {
    console.log(error);
    return null;
  }

  return (
    <div style={{ width: '80%', margin: '0 auto' }}>
      <h1>{data.title}</h1>

      <div style={{ marginBottom: '3rem' }}>{data.description}</div>

      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <Output
          data={data.blogData}
        />
      </div>
    </div>
  );
};

export async function getServerSideProps({ query }) {
  const { slug } = query;

  //make an ajax call to get your blog

  //sample return for testing. Here you will want to return the blog received through ajax call.
  return {
    props: {
      data: {
        title: slug,
        description: 'Blog description',
        blogData: {
          time: 1626368322669,
          blocks: [
            {
              id: '_pD9JtxpKH',
              type: 'header',
              data: {
                text: 'Learn Editor.js and Next.js',
                level: 2,
              },
            },
            {
              id: 'LiXMu6f0g5',
              type: 'paragraph',
              data: {
                text: 'Two awesome technologies to create great web applications',
              },
            },
            {
              id: 'GAnygPKW8G',
              type: 'header',
              data: {
                text: 'How to',
                level: 3,
              },
            },
            {
              id: '0aTmlz5KXH',
              type: 'list',
              data: {
                style: 'unordered',
                items: [
                  'Create custom editor component',
                  'Dynamically import react-editor-js and plugins',
                  'Use a onSave prop to pass data back to the parent',
                ],
              },
            },
            {
              id: 'xefrTVffwi',
              type: 'paragraph',
              data: {
                text: 'Editor.js outputs <mark class=\"cdx-marker\">clean json data</mark> which is a very existing feature and takes its useability through the roof since your blog data can now be used for anything and not just web',
              },
            },
            {
              id: '0AFq4DZI_r',
              type: 'delimiter',
              data: {},
            },
            {
              id: 'vJJ2tvL7uf',
              type: 'paragraph',
              data: {
                text: 'The documentation is also very through for both Next.js and Editor.js so do give them a try.',
              },
            },
          ],
          version: '2.22.0',
        },
      },
    },
  };
}

export default BlogDetail;
