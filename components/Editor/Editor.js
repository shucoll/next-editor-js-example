import { useEffect, useState } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
const EditorJs = dynamic(() => import('react-editor-js'), { ssr: false });

let editorInstance;

const Editor = (props) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [editorTools, setEditorTools] = useState();

  const onSaveHandler = async (editorInstance) => {
    try {
      const blogData = await editorInstance.save();
      if (!title || title === '')
        throw new Error('Title cannot be empty. Please enter title');
      if (!blogData.blocks[0])
        throw new Error('Blog cannot be empty. Please enter some data');
      props.onSave(blogData, title, description);
    } catch (err) {
      console.log(err);
    }
  };

  let editorComponent;
  if (!editorTools) editorComponent = 'Loading...';
  else{
    editorComponent = (
      <EditorJs
        instanceRef={(instance) => (editorInstance = instance)}
        tools={editorTools}
        placeholder={`Let's write an awesome blog!`}
      />
    );
  }


  useEffect(() => {
    const importConstants = async () => {
      const tools = (await import('../../components/Editor/EditorConstants'))
        .default;
      setEditorTools(tools);
    };

    importConstants();
  }, []);

  const inputStyle = {
    maxWidth: '500px',
    marginBottom: '20px',
    height: '30px'
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column'}}>
      <Head>
        <title>Create Blog</title>
        <meta name='description' content='Generated by create next app' />
      </Head>

      <input
        style={inputStyle}
        placeholder='Your Blog Title'
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />

      <input
        style={inputStyle}
        placeholder='Your Blog Description'
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />

      {editorComponent}

      <div style={{ textAlign: 'center'}}>
        <button
          onClick={() => onSaveHandler(editorInstance)}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default Editor;
